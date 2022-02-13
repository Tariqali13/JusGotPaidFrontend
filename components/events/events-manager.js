import React, { useContext, useState } from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { useTable } from 'react-table';
import { useQuery, useMutation } from 'react-query';
import Router from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import { ConfirmationModal } from '@/components/modal';
import Link from 'next/link';
import TemplateContext from '@/layout/secure-template/context';
import { GET_EVENTS_DATA, DELETE_EVENT } from './queries';

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

type Props = {
  passedEvents: boolean,
}
const EventsManager = (props: Props) => {
  const { passedEvents = false } = props;
  const { userData } = useContext(TemplateContext);
  const isAdmin = _get(userData, 'role', 'User') === 'Admin';
  const { user_id, user_role } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const splitUrl = isWindow && window.location.href.split('/');
  const [deleteModal, setDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  console.log('isAdmin', isAdmin, userData);
  const [deleteEvent, { isLoading: isLoadingDelete }] = useMutation(
    DELETE_EVENT,
  );

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
  const handleDelete = id => {
    setDeleteModal(true);
    const findEvent = _get(eventsData, 'data', []).find(
      event => event._id === id,
    );
    setEventToDelete(findEvent);
  };

  const { data: eventsData, isLoading: isEventsDataLoading, refetch } = useQuery(
    ['EVENTS_DATA', { passedEvents: passedEvents }],
    GET_EVENTS_DATA,
    {
      ...reactQueryConfig,
    },
  );
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteEvent(_get(eventToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const tableData = _get(eventsData, 'data', []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <>
      <div id="content">
        <SearchHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="h3 mb-2 text-gray-800">
                {passedEvents ? 'Passed Events' : 'Current Events'}
              </h1>
              <p className="mb-4">List of all the events</p>
            </div>
            {isAdmin && (
              <div className="col-md-6 col-sm-12">
                <button
                  className="btn btn-primary"
                  style={{ float: 'right' }}
                  onClick={() =>
                    Router.push(
                      '/admin/events/create',
                      '/admin/events/create',
                      {
                        shallow: true,
                      },
                    )
                  }
                >
                  {' '}
                  Create New Event{' '}
                </button>
              </div>
            )}
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
                              {_get(row, 'original.no_of_tickets') -
                                _get(row, 'original.no_of_tickets_sold')}
                            </td>
                            <td className="d-flex justify-content-between align-items-center ">
                              <i
                                className="fa fa-eye cursor-pointer icon-hover"
                                onClick={() =>
                                  window.open(
                                    `/influencer/${user_id}/event/${_get(
                                      row,
                                      'original._id',
                                    )}`,
                                    '_blank',
                                  )
                                }
                              />
                              {isAdmin && (
                                <Link
                                  href={`/admin/events/${_get(
                                    row,
                                    'original._id',
                                  )}/edit`}
                                >
                                  <i className="fa fa-edit cursor-pointer icon-hover " />
                                </Link>
                              )}
                              {isAdmin && (
                                <i
                                  className="fa fa-trash cursor-pointer icon-hover"
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setEventToDelete(row.original);
                                  }}
                                />
                              )}
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
                                <i className="fa fa-link cursor-pointer icon-hover"></i>
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
          Are you sure you want to delete event{' '}
          <strong>{eventToDelete?.event_name}</strong> ?
        </p>
      </ConfirmationModal>
      {(isEventsDataLoading || isLoadingDelete) && (
        <ProgressLoader isLoading={isEventsDataLoading || isLoadingDelete} />
      )}
    </>
  );
};

export default EventsManager;
