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
import { GET_SALES_DATA } from './queries';

const columns = [
  {
    Header: 'User Name',
    accessor: 'user_id.first_name', // accessor is the "key" in the data
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
    accessor: 'total_amount',
  },
];
const SalesManager = () => {
  const { user_id } = getLocalStorageValues();
  const { data: salesData, isLoading: isSalesDataLoading } = useQuery(
    ['SALES_DATA', { id: user_id }],
    GET_SALES_DATA,
    {
      ...reactQueryConfig,
    },
  );
  const tableData = _get(salesData, 'data', []);
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
              <h1 className="h3 mb-2 text-gray-800">Sales</h1>
              <p className="mb-4">List of all the sales</p>
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
      {isSalesDataLoading && (
        <ProgressLoader isLoading={isSalesDataLoading} />
      )}
    </SecureTemplate>
  );
};

export default SalesManager;
