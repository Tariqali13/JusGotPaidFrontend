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
import { GET_REFERRAL_USERS } from './queries';

const columns = [
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
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_number',
  },
];
const ReferralUsers = () => {
  const { profile_link } = getLocalStorageValues();
  //   const { data: referralUsers, isLoading: isReferralUsersDataLoading } = useQuery(
  //     ['REFERRAL_USERS', { profile_link: profile_link }],
  //     GET_REFERRAL_USERS,
  //     {
  //       ...reactQueryConfig,
  //     },
  //   );
  const [usersParams, setUsersParams] = useState({
    records_per_page: 5,
    page_no: 1,
    referralLink: profile_link,
  });
  const [paginationData, setPaginationData] = useState({});
  const { data, isLoading, isError, isFetching } = useQuery(
    ['REFERRAL_USERS', usersParams],
    GET_REFERRAL_USERS,
    {
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
    setUsersParams({
      ...usersParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setUsersParams({
      ...usersParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setUsersParams({
      ...usersParams,
      page_no: page,
    });
  };
  return (
    <SecureTemplate>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1 className="h3 mb-2 text-gray-800">Referral Users</h1>
            <p className="mb-4">List of all the referral users</p>
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
                {(_get(data, 'data', []).length === 0 || isError) && (
                  <h3 className="text-center">No Events Found</h3>
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
      {(isLoading || isFetching) && (
        <ProgressLoader isLoading={isLoading || isFetching} />
      )}
    </SecureTemplate>
  );
};

export default ReferralUsers;
