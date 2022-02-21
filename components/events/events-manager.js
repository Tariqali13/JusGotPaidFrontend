import React, { useContext, useEffect, useState } from 'react';
import SearchHeader from '@/components/search-header';
import { useTable } from 'react-table';
import { useQuery, useMutation, isError } from 'react-query';
import Router, { useRouter } from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import reactQueryConfig from '@/constants/react-query-config';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Message } from '@/components/alert/message';
import { ConfirmationModal } from '@/components/modal';
import TemplateContext from '@/layout/secure-template/context';
import Pagination from '@/utils/pagination';
import AdminPagination from '@/components/pagination';
import { Input } from 'reactstrap';
import { EventsActions, EventViewModal } from './components';
import {
  GET_EVENTS_DATA,
  DELETE_EVENT,
  UPDATE_EVENT_HIDDEN,
  GET_EVENTS_TRAN_DATA,
  GET_EVENT_BY_ID,
} from './queries';

const columns = [
  {
    Header: 'Name',
    accessor: 'event_name', // accessor is the "key" in the data
  },
  {
    Header: 'Type',
    accessor: 'event_type',
  },
  {
    Header: 'Date',
    accessor: 'event_date',
  },
  {
    Header: 'Location',
    accessor: 'event_location',
  },
  {
    Header: 'Ticket Price',
    accessor: 'ticket_price',
  },
  {
    Header: 'Tickets Sold',
    accessor: 'no_of_tickets_sold',
  },

  // {
  //   Header: 'Available Tickets',
  //   accessor: 'no_of_tickets',
  // },
];

type Props = {
  passedEvents: boolean,
};
const EventsManager = (props: Props) => {
  // eslint-disable-next-line react/prop-types
  const { passedEvents, hiddenEvents = false } = props;
  const router = useRouter();
  const { userData } = useContext(TemplateContext);
  const isAdmin = _get(userData, 'role', 'User') === 'Admin';
  const { user_id } = getLocalStorageValues();
  const isWindow = typeof window !== 'undefined';
  const splitUrl = isWindow && window.location.href.split('/');
  const [deleteModal, setDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [viewModal, setViewModal] = useState(false);
  const [eventToView, setEventToView] = useState({});
  const toggleViewModal = () => setViewModal(!viewModal);
  const [deleteEvent, { isLoading: isLoadingDelete }] = useMutation(
    DELETE_EVENT,
  );
  const [updateHiddenEvent, { isLoading: isLoadingHidden }] = useMutation(
    UPDATE_EVENT_HIDDEN,
  );
  const [eventParams, setEventParams] = useState({
    records_per_page: 5,
    page_no: 1,
    events_passed: passedEvents,
    is_hidden: hiddenEvents,
    all_events: !!hiddenEvents,
  });

  const [paginationData, setPaginationData] = useState({});
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

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    isError,
    refetch,
  } = useQuery(['EVENTS_DATA', eventParams], GET_EVENTS_DATA, {
    ...reactQueryConfig,
    onSuccess: res => {
      // eslint-disable-next-line no-undef
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_events,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });

  const enableTrans = typeof _get(eventToView, '_id') === 'string';
  const { data: transData, isLoading: isLoadingTransData } = useQuery(
    [
      'GET_EVENTS_TRAN_DATA',
      {
        event_id: _get(eventToView, '_id', ''),
      },
    ],
    GET_EVENTS_TRAN_DATA,
    {
      ...reactQueryConfig,
      enabled: enableTrans && isAdmin,
    },
  );
  const { data: eventData, isLoading: isLoadingEventData } = useQuery(
    [
      'GET_EVENT_BY_ID',
      {
        id: _get(eventToView, '_id', ''),
      },
    ],
    GET_EVENT_BY_ID,
    {
      ...reactQueryConfig,
      enabled: enableTrans,
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

  const handleNext = page => {
    setEventParams({
      ...eventParams,
      page_no: parseInt(page),
    });
  };
  const handlePrevious = page => {
    setEventParams({
      ...eventParams,
      page_no: parseInt(page),
    });
  };
  const handlePageSelect = page => {
    setEventParams({
      ...eventParams,
      page_no: page,
    });
  };
  const handleHidden = async (id, status) => {
    await updateHiddenEvent(
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
  useEffect(() => {
    refetch();
  }, [router.pathname]);
  const handleViewEvent = event => {
    setEventToView(event);
    setViewModal(true);
  };
  const handleConfirmClose = () => {
    setEventToView({});
    setViewModal(false);
  };
  return (
    <>
      <div id="content">
        <SearchHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="h3 mb-2 text-gray-800">
                {passedEvents && 'Passed Events'}
                {hiddenEvents && 'Hidden Events'}
                {!passedEvents && !hiddenEvents && 'Current Events'}
              </h1>
              <p className="mb-4">List of all the events</p>
            </div>
            {isAdmin && !hiddenEvents && (
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
                          <th>Total Sales</th>
                          <th>Available Tickets</th>
                          {isAdmin && <th>Hidden</th>}
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
                              {_get(row, 'original.ticket_price', 0) *
                                _get(row, 'original.no_of_tickets_sold', 0)}
                            </td>
                            <td>
                              {_get(row, 'original.no_of_tickets') -
                                _get(row, 'original.no_of_tickets_sold')}
                            </td>
                            {isAdmin && (
                              <td className="text-center">
                                <Input
                                  style={{ position: 'relative' }}
                                  type="checkbox"
                                  checked={_get(
                                    row,
                                    'original.is_hidden',
                                    false,
                                  )}
                                  onChange={() =>
                                    handleHidden(
                                      _get(row, 'original._id'),
                                      _get(row, 'original.is_hidden', false),
                                    )
                                  }
                                />
                              </td>
                            )}
                            <td className="text-center">
                              <EventsActions
                                user_id={user_id}
                                isAdmin={isAdmin}
                                row={row}
                                handleDelete={handleDelete}
                                handleViewEvent={handleViewEvent}
                              />
                              {/* <CopyToClipboard */}
                              {/*  text={`${window.location.protocol}://${ */}
                              {/*    splitUrl[2] */}
                              {/*  }/influencer/${user_id}/event/${_get( */}
                              {/*    row, */}
                              {/*    'original._id', */}
                              {/*  )}`} */}
                              {/*  onCopy={() => */}
                              {/*    Message.success(null, { */}
                              {/*      message: 'Link Copied', */}
                              {/*    }) */}
                              {/*  } */}
                              {/* > */}
                              {/*  <i className="fa fa-link cursor-pointer icon-hover"></i> */}
                              {/* </CopyToClipboard> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(_get(eventsData, 'data', []).length === 0 || isError) && (
                    <h3 className="text-center">No Events Found</h3>
                  )}
                  {_get(eventsData, 'data', []).length > 0 && !isError && (
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
          Are you sure you want to delete event{' '}
          <strong>{eventToDelete?.event_name}</strong> ?
        </p>
      </ConfirmationModal>
      <ConfirmationModal
        size="lg"
        heading={`Event Preview - ${_get(eventToView, 'event_name')}`}
        modalOpen={viewModal}
        toggleModal={toggleViewModal}
        handleCancelButton={toggleViewModal}
        isCancelButton={false}
        isConfirmButton={true}
        confirmButtonText="Close"
        handleConfirmButton={handleConfirmClose}
      >
        <EventViewModal
          eventData={_get(eventData, 'data', {})}
          transData={_get(transData, 'data', {})}
          isAdmin={isAdmin}
        />
      </ConfirmationModal>
      {(isEventsDataLoading ||
        isLoadingDelete ||
        isLoadingHidden ||
        isLoadingTransData ||
        isLoadingEventData) && (
        <ProgressLoader
          isLoading={
            isEventsDataLoading ||
            isLoadingDelete ||
            isLoadingHidden ||
            isLoadingTransData ||
            isLoadingEventData
          }
        />
      )}
    </>
  );
};

export default EventsManager;
