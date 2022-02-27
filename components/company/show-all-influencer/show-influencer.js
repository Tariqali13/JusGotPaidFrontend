import React, { useContext, useState } from 'react';
import SearchHeader from '@/components/search-header';
import { useTable, useSortBy } from 'react-table';
import { useMutation, useQuery } from 'react-query';
import { InfluencerAction } from '@/components/company/show-all-influencer/edit-comission/components';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import { Message } from '@/components/alert/message';
import { ConfirmationModal } from '@/components/modal';
import TemplateContext from '@/layout/secure-template/context';
import { FormGroup, Input, Button, Form } from 'reactstrap';
import Pagination from '@/utils/pagination';
import AdminPagination from '@/components/pagination';
import {
  DELETE_INFLUENCER,
  GET_INFLUENCERS_DATA,
  SUSPEND_INFLUENCER,
} from './queries';

const columns = [
  {
    Header: 'Sr #',
    id: 'row',
    accessor: (_row: any, i: number) => i + 1,
  },
  {
    Header: 'First Name',
    accessor: 'first_name', // accessor is the "key" in the data
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Commission %',
    accessor: 'comission',
  },
];
const ShowInfluencers = () => {
  const { user_id, profile_link } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const { userData } = useContext(TemplateContext);
  const isAdmin = _get(userData, 'role', 'User') === 'Admin';
  const splitUrl = isWindow && window.location.href.split('/');
  const [deleteModal, setDeleteModal] = useState(false);
  const [influencerToDelete, setInfluencerToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [isSearched, setIsSearched] = useState(false);
  const [deleteInfluencer, { isLoading: isLoadingDelete }] = useMutation(
    DELETE_INFLUENCER,
  );
  const [suspendInfluencer, { isLoading: isLoadingSuspend }] = useMutation(
    SUSPEND_INFLUENCER,
  );
  const [userParams, setUserParams] = useState({
    records_per_page: 5,
    page_no: 1,
  });
  const [paginationData, setPaginationData] = useState({});
  const [searchName, setSearchName] = useState('');
  const handleChangeName = e => {
    setSearchName(e.target.value);
  };
  const {
    data: influencersData,
    refetch,
    isError,
    isLoading: isInfluencersDataLoading,
  } = useQuery(['INFLUENCERS_DATA', userParams], GET_INFLUENCERS_DATA, {
    ...reactQueryConfig,
    onSuccess: res => {
      // eslint-disable-next-line no-undef
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_users,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });
  const handleSearchName = () => {
    if (searchName) {
      setUserParams({
        ...userParams,
        name: searchName,
      });
      setIsSearched(true);
    } else {
      Message.error(null, { message: 'Please enter Name to search!' });
    }
  };

  const handleClearSearchName = () => {
    setUserParams({
      records_per_page: 5,
      page_no: userParams.page_no,
    });
    setSearchName('');
    setIsSearched(false);
  };

  const handleNext = page => {
    setUserParams({
      ...userParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setUserParams({
      ...userParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setUserParams({
      ...userParams,
      page_no: page,
    });
  };
  const handleDelete = id => {
    setDeleteModal(true);
    const findInfluencer = _get(influencersData, 'data', []).find(
      influencer => influencer._id === id,
    );
    setInfluencerToDelete(findInfluencer);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteInfluencer(_get(influencerToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const handleSuspend = async (id, status) => {
    await suspendInfluencer(
      {
        id,
        data: {
          status: !status,
        },
      },
      {
        onSuccess: async res => {
          await refetch();
          Message.success(res);
        },
        onError: error => {
          Message.error(error);
        },
      },
    );
  };
  const tableData = _get(influencersData, 'data', []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: tableData, autoResetSortBy: false, autoResetPage: false },
    useSortBy,
  );
  return (
    <>
      <div id="content">
        <SearchHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="h3 mb-2 text-gray-800">Users</h1>
              <p className="mb-4">List of all user</p>
            </div>
          </div>
          <div
            className="card shadow mb-4"
            style={{ height: '62vh', overflow: 'auto' }}
          >
            <div className="card-body">
              <div className="table-responsive">
                <div
                  id="dataTable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4"
                >
                  <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Input
                        type="text"
                        name="name"
                        value={searchName}
                        onChange={handleChangeName}
                        onKeyPress={event => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            handleSearchName();
                          }
                        }}
                        placeholder="Search by user name"
                      />
                    </FormGroup>
                    <Button color="info" onClick={handleSearchName}>
                      Search
                    </Button>
                    {isSearched && (
                      <Button
                        color="primary"
                        className="ml-2"
                        onClick={handleClearSearchName}
                      >
                        Clear Search
                      </Button>
                    )}
                  </Form>
                  <table
                    {...getTableProps()}
                    className="table table-bordered dataTable"
                  >
                    <thead>
                      {headerGroups?.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                          {headerGroup.headers.map((column, innerIndex) => (
                            <th
                              {...column.getHeaderProps(
                                column?.getSortByToggleProps(),
                              )}
                              key={innerIndex}
                            >
                              {column.render('Header')}
                              <span>
                                {column?.isSorted
                                  ? column?.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                  : ' 🔼🔽'}
                              </span>
                            </th>
                          ))}
                          <th>Actions</th>
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      style={{ height: '50px', overflowY: 'scroll' }}
                    >
                      {rows?.map((row, index) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={index}>
                            {row.cells.map((cell, innerIndex) => {
                              return (
                                <td {...cell.getCellProps()} key={innerIndex}>
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                            <td className="text-center">
                              <InfluencerAction
                                user_id={user_id}
                                isAdmin={isAdmin}
                                row={row}
                                handleDelete={handleDelete}
                                handleSuspend={handleSuspend}
                              />
                            </td>
                            {/* <button */}
                            {/*  className="btn btn-primary btn-sm" */}
                            {/*  onClick={() => */}
                            {/*    window.open( */}
                            {/*      `/admin/influencer/edit/${_get( */}
                            {/*        row, */}
                            {/*        'original._id', */}
                            {/*      )}`, */}
                            {/*      '_self', */}
                            {/*    ) */}
                            {/*  } */}
                            {/* > */}
                            {/*  Edit User */}
                            {/* </button> */}
                            {/* </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(_get(influencersData, 'data', []).length === 0 ||
                    isError) && <h3 className="text-center">No Users Found</h3>}
                  {_get(influencersData, 'data', []).length > 0 && !isError && (
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
      </div>
      <ConfirmationModal
        heading="Confirm Delete"
        modalOpen={deleteModal}
        toggleModal={toggleDeleteModal}
        handleCancelButton={toggleDeleteModal}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Delete"
        handleConfirmButton={handleConfirmDelete}
      >
        <p>
          Are you sure you want to delete influencer{' '}
          <strong>
            {influencerToDelete?.first_name} {influencerToDelete?.last_name}
          </strong>
          ?
        </p>
      </ConfirmationModal>
      {(isInfluencersDataLoading || isLoadingDelete || isLoadingSuspend) && (
        <ProgressLoader
          isLoading={
            isInfluencersDataLoading || isLoadingDelete || isLoadingSuspend
          }
        />
      )}
    </>
  );
};

export default ShowInfluencers;
