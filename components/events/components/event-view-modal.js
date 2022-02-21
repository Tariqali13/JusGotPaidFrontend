import React from 'react';
import _get from 'lodash.get';
import moment from 'moment';

type Props = {
  eventData: any,
  transData: any,
  isAdmin: boolean,
};

const EventViewModal = (props: Props) => {
  const { eventData, transData, isAdmin } = props;
  return (
    <div>
      <h3 className="my-3">Basic Information</h3>
      <div className="row">
        <div className="col-6">
          <img
            className="w-100"
            alt="cover-image"
            src={_get(
              eventData,
              'cover_image_id.file_url',
              '/img/event-generic.jpg',
            )}
          />
        </div>
        <div className="col-6">
          <div className="row justify-content-center">
            <div className="card" style={{ width: '18rem' }}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Name: {_get(eventData, 'event_name')}
                </li>
                <li className="list-group-item">
                  Type: {_get(eventData, 'event_type')}
                </li>
                <li className="list-group-item">
                  Date: {_get(eventData, 'event_date')}
                </li>
                <li className="list-group-item">
                  Location: {_get(eventData, 'event_location')}
                </li>
                <li className="list-group-item">
                  Total Tickets: {_get(eventData, 'no_of_total_tickets')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {_get(eventData, 'images', []).length > 0 && (
        <>
          <hr className="my-3" />
          <h3 className="my-3">Event Images</h3>
          <div className="row">
            {_get(eventData, 'images', []).map((image, i) => (
              <div className="col-4" key={i}>
                <img
                  className="w-100"
                  alt="cover-image"
                  src={_get(image, 'file_url', '')}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {transData.length > 0 && isAdmin && (
        <>
          <hr className="my-3" />
          <h3 className="my-3">Transactions</h3>
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <table className="table table-bordered dataTable">
                <thead>
                  <tr>
                    <th>Purchaser Name</th>
                    <th>Purchaser Email</th>
                    <th>Tickets Bought</th>
                    <th>Total Amount</th>
                    <th>Purchased At</th>
                  </tr>
                </thead>
                <tbody style={{ height: '50px', overflowY: 'scroll' }}>
                  {transData.map((tan, i) => (
                    <tr key={i}>
                      <td>
                        {_get(tan, 'user_id.first_name')}{' '}
                        {_get(tan, 'user_id.last_name')}
                      </td>
                      <td>{_get(tan, 'user_id.email')}</td>
                      <td>{_get(tan, 'tickets_buy')}</td>
                      <td>{_get(tan, 'total_amount')}</td>
                      <td>
                        {moment(_get(tan, 'createdAt')).format('YYYY-MM-DD')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { EventViewModal };
