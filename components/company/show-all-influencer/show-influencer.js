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
import { Input } from 'reactstrap';
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
  const [deleteInfluencer, { isLoading: isLoadingDelete }] = useMutation(
    DELETE_INFLUENCER,
  );
  const [suspendInfluencer, { isLoading: isLoadingSuspend }] = useMutation(
    SUSPEND_INFLUENCER,
  );
  const {
    data: influencersData,
    refetch,
    isLoading: isInfluencersDataLoading,
  } = useQuery(['INFLUENCERS_DATA', { profile_link }], GET_INFLUENCERS_DATA, {
    ...reactQueryConfig,
  });
  console.log(influencerToDelete, 'influencerToDelete');
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
  } = useTable({ columns, data: tableData }, useSortBy);
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
                  <table
                    {...getTableProps()}
                    className="table table-bordered dataTable"
                  >
                    <thead>
                      {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                          {headerGroup.headers.map((column, innerIndex) => (
                            <th
                              {...column.getHeaderProps(
                                column.getSortByToggleProps(),
                              )}
                              key={innerIndex}
                            >
                              {column.render('Header')}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
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
                      {rows.map((row, index) => {
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
