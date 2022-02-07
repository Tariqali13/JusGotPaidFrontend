// @flow
import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { useTable } from 'react-table';
import { useQuery } from 'react-query';
import Router from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import { GET_EVENTS_DATA, GET_INFLUENCER_EVENTS_DATA } from './queries';
import { GET_EVENT_DATA } from './detail/queries';

const columns = [
  {
    Header: 'Event Name',
    accessor: 'event_name', // accessor is the "key" in the data
  },
  {
    Header: 'Event Type',
    accessor: 'event_type',
  },
  {
    Header: 'Event Date',
    accessor: 'event_date',
  },
  {
    Header: 'Event Location',
    accessor: 'event_location',
  },
  // {
  //   Header: 'Available Tickets',
  //   accessor: 'no_of_tickets',
  // },
];
const EventsManager = (props) => {
  const { user_id, user_role } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const splitUrl = isWindow && window.location.href.split('/');
 
  // if(user_role === "Admin") {
  //   var { data: eventsData, isLoading: isEventsDataLoading } = useQuery(
  //     ['EVENTS_DATA', { id: user_id }],
  //     GET_EVENTS_DATA,
  //     {
  //       ...reactQueryConfig,
  //     },
  //   );
  // }

  // if(user_role === "Influencer") {
  //   var { data: eventsData, isLoading: isEventsDataLoading } = useQuery(
  //     ['EVENTS_DATA', { id: user_id }],
  //     GET_INFLUENCER_EVENTS_DATA,
  //     {
  //       ...reactQueryConfig,
  //     },
  //   );
  // }
  
  var { data: eventsData, isLoading: isEventsDataLoading } = useQuery(
    ['EVENTS_DATA', {passedEvents: props.passedEvents}],
    GET_EVENTS_DATA,
    {
      ...reactQueryConfig,
    },
  );

  const tableData = _get(eventsData, 'data', []);
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
              <h1 className="h3 mb-2 text-gray-800">Events</h1>
              <p className="mb-4">List of all the events</p>
            </div>
            {
              user_role !== "Admin" ? "": (
                <div className="col-md-6 col-sm-12">
              <button
                className="btn btn-primary"
                style={{ float: 'right' }}
                onClick={() =>
                  Router.push('/admin/events/create', '/admin/events/create', {
                    shallow: true,
                  })
                }
              >
                {' '}
                Create New Event{' '}
              </button>
            </div>
              )
            }
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
                      {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                          {headerGroup.headers.map((column, innerIndex) => (
                            <th {...column.getHeaderProps()} key={innerIndex}>
                              {column.render('Header')}
                            </th>
                          ))}
                          <th>Available Tickets</th>
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
                            <td>
                              {
                                _get(
                                  row,
                                  'original.no_of_tickets',
                                ) - _get(
                                  row,
                                  'original.no_of_tickets_sold',
                                )
                              }
                            </td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  window.open(
                                    `/influencer/${user_id}/event/${_get(
                                      row,
                                      'original._id',
                                    )}`,
                                    '_blank',
                                  )
                                }
                              >
                                Preview Event
                              </button>
                              <CopyToClipboard
                                text={`${window.location.protocol}://${
                                  splitUrl[2]
                                }/influencer/${user_id}/event/${_get(
                                  row,
                                  'original._id',
                                )}`}
                                onCopy={() =>
                                  Message.success(null, {
                                    message: 'Link Copied',
                                  })
                                }
                              >
                                <button className="btn btn-primary ml-3 btn-sm">
                                  Copy Link
                                </button>
                              </CopyToClipboard>
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
      {isEventsDataLoading && (
        <ProgressLoader isLoading={isEventsDataLoading} />
      )}
    </SecureTemplate>
  );
};

export default EventsManager;
