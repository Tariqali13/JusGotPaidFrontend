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
import { GET_INFLUENCERS_DATA } from './queries';

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
    Header: 'Commission %',
    accessor: 'comission',
  },
];
const ShowInfluencers = () => {
  const { user_id, profile_link } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const splitUrl = isWindow && window.location.href.split('/');
  const {
    data: influencersData,
    isLoading: isInfluencersDataLoading,
  } = useQuery(['INFLUENCERS_DATA', {profile_link, profile_link}], GET_INFLUENCERS_DATA, {
    ...reactQueryConfig,
  });
  const tableData = _get(influencersData, 'data', []);
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
                          <th>Sr #</th>
                          {headerGroup.headers.map((column, innerIndex) => (
                            <th {...column.getHeaderProps()} key={innerIndex}>
                              {column.render('Header')}
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
                            <td>{index + 1}</td>
                            {row.cells.map((cell, innerIndex) => {
                              return (
                                <td {...cell.getCellProps()} key={innerIndex}>
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  window.open(
                                    `/admin/influencer/edit/${_get(
                                      row,
                                      'original._id',
                                    )}`,
                                    '_self',
                                  )
                                }
                              >
                                Edit Commission
                              </button>
                            </td>
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
      {isInfluencersDataLoading && (
        <ProgressLoader isLoading={isInfluencersDataLoading} />
      )}
    </SecureTemplate>
  );
};

export default ShowInfluencers;
