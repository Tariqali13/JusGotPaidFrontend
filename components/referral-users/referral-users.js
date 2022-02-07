// @flow
import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { useTable } from 'react-table';
import { useQuery } from 'react-query';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
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
const { data, isLoading} = useQuery(
    ['REFERRAL_USERS', { profile_link: profile_link }],
    GET_REFERRAL_USERS,
    {
      ...reactQueryConfig,
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
  return (
    <SecureTemplate>
      <div id="content">
        <SearchHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="h3 mb-2 text-gray-800">Referral Users</h1>
              <p className="mb-4">List of all the referral users</p>
            </div>
          </div>
          <div className="card shadow mb-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <ProgressLoader isLoading={isLoading} />
      )}
    </SecureTemplate>
  );
};

export default ReferralUsers;
