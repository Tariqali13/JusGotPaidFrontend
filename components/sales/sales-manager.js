// @flow
import React, { useState } from 'react';
import SecureTemplate from '@/layout/secure-template';
import { useTable } from 'react-table';
import { useQuery } from 'react-query';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import Pagination from '@/utils/pagination';
import AdminPagination from '@/components/pagination';
import { priceCalculator } from '@/utils/display-util';
import { GET_SALES_DATA } from './queries';
import moment from 'moment';

const columns = [
  {
    Header: 'Ticket Purchase By',
    accessor: (_row: any, i: number) => (
      <span>
        {_get(_row, 'user_id.first_name', '')}{' '}
        {_get(_row, 'user_id.last_name', '')}
      </span>
    ),
  },
  {
    Header: 'Event Name',
    accessor: 'event_id.event_name',
  },
  {
    Header: 'Tickets Purchase',
    accessor: 'tickets_buy',
  },
  {
    Header: 'Total Amount ($)',
    accessor: (_row: any, i: number) => (
      <span>{priceCalculator(_row.total_amount, '$')}</span>
    ),
  },
  {
    Header: 'Purchase At',
    accessor: (_row: any, i: number) => (
      <span>{moment(_row.createdAt).format('DD-MM-YYYY hh:mm a')}</span>
    ),
  },
];
const SalesManager = () => {
  const { user_id } = getLocalStorageValues();
  const [saleParams, setSaleParams] = useState({
    records_per_page: 5,
    page_no: 1,
    influencer_id: user_id,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: salesData,
    isError,
    isFetching,
    isLoading: isSalesDataLoading,
  } = useQuery(['SALES_DATA', saleParams], GET_SALES_DATA, {
    ...reactQueryConfig,
    onSuccess: res => {
      // eslint-disable-next-line no-undef
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_trans,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });
  const tableData = _get(salesData, 'data', []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });
  const handleNext = page => {
    setSaleParams({
      ...saleParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setSaleParams({
      ...saleParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setSaleParams({
      ...saleParams,
      page_no: page,
    });
  };
  return (
    <SecureTemplate>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1 className="h3 mb-2 text-gray-800">Sales</h1>
            <p className="mb-4">List of all the sales</p>
          </div>
        </div>
        <div
          className="card shadow mb-4"
          style={{ maxHeight: '66vh', overflow: 'auto' }}
        >
          <div className="card-body">
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {(_get(salesData, 'data', []).length === 0 || isError) && (
                  <h3 className="text-center">No Sales Found</h3>
                )}
                {_get(salesData, 'data', []).length > 0 && !isError && (
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
      {(isSalesDataLoading || isFetching) && (
        <ProgressLoader isLoading={isSalesDataLoading || isFetching} />
      )}
    </SecureTemplate>
  );
};

export default SalesManager;
