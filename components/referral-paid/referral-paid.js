// @flow
import React, { useState } from 'react';
import { useTable } from 'react-table';
import { useQuery, useMutation } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import Pagination from '@/utils/pagination';
import AdminPagination from '@/components/pagination';
import { Message } from '@/components/alert/message';
import { ConfirmationModal } from '@/components/modal';
import { Formik } from 'formik';
import { priceCalculator } from '@/utils/display-util';
import { PayModal } from './components';
import {
  GET_REFERRAL_PAID,
  TRANSFER_AMOUNT,
  UPDATE_COMMISSION,
  GET_TOTAL_REFERRAL_PAID,
  BULK_TRANSFER_AMOUNT,
  BULK_UPDATE_COMMISSION,
} from './queries';
import { validatePayForm } from './validations';

const columns = [
  {
    Header: 'First Name',
    accessor: 'user_id.first_name', // accessor is the "key" in the data
  },
  {
    Header: 'Last Name',
    accessor: 'user_id.last_name',
  },
  {
    Header: 'Event Name',
    accessor: 'event_id.event_name',
  },
  {
    Header: 'total_amount',
    accessor: (_row: any) => (
      <span>{priceCalculator(_row.total_amount, '$')}</span>
    ),
  },
  {
    Header: 'Amount Paid',
    accessor: (_row: any) => (
      <span>{priceCalculator(_row.amount_paid, '$')}</span>
    ),
  },
  {
    Header: 'Pending Amount',
    accessor: (_row: any) => (
      <span>{priceCalculator(_row.total_amount - _row.amount_paid, '$')}</span>
    ),
  },
];

type Props = {
  is_due: boolean,
};

const ReferralPaid = (props: Props) => {
  const { is_due = false } = props;
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const [feeToPay, setFeeToPay] = useState({});
  const [totalCommissionToPay, setTotalCommissionToPay] = useState(0);
  const [openTotalCommissionModal, setOpenTotalCommissionModal] = useState(
    false,
  );
  const toggleTotalCommissionModal = () =>
    setOpenTotalCommissionModal(!openTotalCommissionModal);
  const [referralParams, setReferralParams] = useState({
    records_per_page: 5,
    page_no: 1,
    is_due,
  });
  const [paginationData, setPaginationData] = useState({});
  const [transferAmount, { isLoading: isLoadingTransfer }] = useMutation(
    TRANSFER_AMOUNT,
  );
  const [
    updateCommission,
    { isLoading: isLoadingUpdateComission },
  ] = useMutation(UPDATE_COMMISSION);
  const [
    bulkTransferAmount,
    { isLoading: isLoadingBulkTransfer },
  ] = useMutation(BULK_TRANSFER_AMOUNT);
  const [
    bulkUpdateCommission,
    { isLoading: isLoadingBulkUpdateComission },
  ] = useMutation(BULK_UPDATE_COMMISSION);
  const { data, refetch, isLoading, isFetching, isError } = useQuery(
    ['REFERRAL_PAID', referralParams],
    GET_REFERRAL_PAID,
    {
      ...reactQueryConfig,
      onSuccess: res => {
        // eslint-disable-next-line no-undef
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_commissions,
          res.page_no,
          res.data.length,
        );
        return setPaginationData(result);
      },
      onError: () => {
        setPaginationData({});
      },
    },
  );
  const {
    data: totalCommission,
    refetch: refetchTotal,
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
  } = useQuery(
    ['TOTAL_REFERRAL_PAID', referralParams],
    GET_TOTAL_REFERRAL_PAID,
    {
      ...reactQueryConfig,
      enabled: is_due,
      onSuccess: async res => {
        if (_get(res, 'data', []).length) {
          let total = 0;
          // eslint-disable-next-line no-restricted-syntax,no-unused-vars
          for (const com of _get(res, 'data', [])) {
            total += parseFloat(com.total_amount) - parseFloat(com.amount_paid);
          }
          setTotalCommissionToPay(total);
        }
      },
    },
  );
  const tableData = _get(data, 'data', []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  const handleNext = page => {
    setReferralParams({
      ...referralParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setReferralParams({
      ...referralParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setReferralParams({
      ...referralParams,
      page_no: page,
    });
  };
  const handlePayFee = data => {
    if (!_get(data, 'user_id.is_stripe_connected', false)) {
      Message.error(null, {
        message:
          "User didn't connect stripe yet! Please contact user to connect his/her stripe.",
      });
    } else {
      setFeeToPay(data);
      setOpen(true);
    }
  };
  const handleSubmitTotalCommission = async () => {
    const filterData = _get(totalCommission, 'data', []).filter(com =>
      _get(com, 'user_id.account_id'),
    );
    if (filterData?.length) {
      const dataToTransfer = filterData.map(com => {
        return {
          _id: com._id,
          amount: parseFloat(com.total_amount) - parseFloat(com.amount_paid),
          currency: 'usd',
          destination: com.user_id.account_id,
        };
      });
      await bulkTransferAmount(
        { commissions: dataToTransfer },
        {
          onSuccess: async res => {
            const successData = filterData.filter(co =>
              _get(res, 'data', []).includes(co._id),
            );
            const dataToTransferUpdate = successData.map(com => {
              return {
                _id: com._id,
                manual_amount:
                  parseFloat(com.total_amount) - parseFloat(com.amount_paid),
              };
            });
            await bulkUpdateCommission(
              {
                is_some_error: _get(res, 'is_some_error', false),
                commissions: dataToTransferUpdate,
              },
              {
                onSuccess: async res => {
                  toggleTotalCommissionModal();
                  await refetch();
                  await refetchTotal();
                  Message.success(res, {}, true);
                },
                onError: e => {
                  Message.error(e);
                },
              },
            );
          },
          onError: async e => {
            Message.error(e);
          },
        },
      );
    } else {
      Message.error(null, { message: 'Not Stripe Accounts Connected' });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1 className="h3 mb-2 text-gray-800">
              {!is_due ? 'Referral Fee Paid' : 'Referral Fee Due'}
            </h1>
          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-body">
            {is_due && (
              <button
                onClick={async () => {
                  await refetchTotal();
                  toggleTotalCommissionModal();
                }}
                className="btn btn-primary float-right"
              >
                Pay All
              </button>
            )}
            <div className="table-responsive">
              <div
                id="dataTable_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <table
                  {...getTableProps()}
                  className="table table-bordered dataTable"
                >
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        ))}
                        {is_due && <th>Actions</th>}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    style={{ height: '50px', overflowY: 'scroll' }}
                  >
                    {rows.map(row => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                          {is_due && (
                            <th>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handlePayFee(row.original)}
                              >
                                Pay Now
                              </button>
                            </th>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {(_get(data, 'data', []).length === 0 || isError) && (
                  <h3 className="text-center">No Data Found</h3>
                )}
                {_get(data, 'data', []).length > 0 && !isError && (
                  <AdminPagination
                    paginationData={paginationData}
                    handlePageSelect={handlePageSelect}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          manual_amount:
            _get(feeToPay, 'total_amount', 0) -
            _get(feeToPay, 'amount_paid', 0),
          amount_type: 'full_amount',
          currency: 'cad',
          destination: _get(feeToPay, 'user_id.account_id', ''),
        }}
        validationSchema={validatePayForm}
        onSubmit={async (values, actions) => {
          const dataToTransfer = {
            amount: values.manual_amount,
            currency: values.currency,
            destination: values.destination,
          };
          await transferAmount(dataToTransfer, {
            onSuccess: async res => {
              await updateCommission(
                {
                  id: _get(feeToPay, '_id', 0),
                  data: {
                    amount_paid:
                      values.manual_amount +
                      parseFloat(_get(feeToPay, 'amount_paid', 0)),
                  },
                },
                {
                  onSuccess: async res => {
                    toggleModal();
                    await refetch();
                    await refetchTotal();
                    actions.resetForm();
                    Message.success(res);
                  },
                  onError: e => {
                    Message.error(e);
                  },
                },
              );
            },
            onError: e => {
              Message.error(e);
            },
          });
        }}
      >
        {formikProps => {
          return (
            <ConfirmationModal
              size="md"
              heading={`Pay Commission to - ${_get(
                feeToPay,
                'user_id.first_name',
              )}`}
              modalOpen={open}
              toggleModal={() => {
                toggleModal();
                formikProps.resetForm();
              }}
              handleCancelButton={() => {
                toggleModal();
                formikProps.resetForm();
              }}
              isCancelButton={true}
              isConfirmButton={true}
              disableSubmit={isLoadingTransfer || isLoadingUpdateComission}
              disableCancel={isLoadingTransfer || isLoadingUpdateComission}
              confirmButtonText="Pay Now"
              handleConfirmButton={formikProps.handleSubmit}
            >
              <PayModal {...formikProps} feeToPay={feeToPay} />
            </ConfirmationModal>
          );
        }}
      </Formik>
      <ConfirmationModal
        size="md"
        heading={`Pay Commission of total - ${priceCalculator(
          totalCommissionToPay,
          '$',
        )}`}
        modalOpen={openTotalCommissionModal}
        toggleModal={() => {
          toggleTotalCommissionModal();
        }}
        handleCancelButton={() => {
          toggleTotalCommissionModal();
        }}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Pay Now"
        disableCancel={isLoadingBulkTransfer || isLoadingBulkUpdateComission}
        disableSubmit={isLoadingBulkTransfer || isLoadingBulkUpdateComission}
        handleConfirmButton={handleSubmitTotalCommission}
      >
        <p>
          Are you sure you want to pay full commission to everyone of total
          amount {priceCalculator(totalCommissionToPay, '$')}?
        </p>
      </ConfirmationModal>
      {(isLoading ||
        isFetching ||
        isLoadingTransfer ||
        isLoadingUpdateComission ||
        isLoadingTotal ||
        isFetchingTotal ||
        isLoadingBulkTransfer ||
        isLoadingBulkUpdateComission) && (
        <ProgressLoader
          isLoading={
            isLoading ||
            isFetching ||
            isLoadingTransfer ||
            isLoadingUpdateComission ||
            isLoadingTotal ||
            isFetchingTotal ||
            isLoadingBulkTransfer ||
            isLoadingBulkUpdateComission
          }
        />
      )}
    </>
  );
};

export default ReferralPaid;
