import React, { useEffect, useState } from 'react';
import _get from 'lodash.get';
import moment from 'moment';
import { priceCalculator } from '@/utils/display-util';
import AdminPagination from '@/components/pagination';
import { Spinner } from 'reactstrap';

type Props = {
  eventData: any,
  transData: any,
  isAdmin: boolean,
  paginationData: any,
  handlePageSelect: () => {},
  handlePrevious: () => {},
  handleNext: () => {},
  isError: boolean,
  isLoadingTransData: boolean,
  isFetchingTran: boolean,
  totalTransData: any,
};

const EventViewModal = (props: Props) => {
  const {
    eventData,
    transData,
    isAdmin,
    paginationData,
    handleNext,
    handlePageSelect,
    handlePrevious,
    isError,
    isFetchingTran,
    isLoadingTransData,
    totalTransData,
  } = props;
  const [totalSale, setTotalSale] = useState(0);
  useEffect(() => {
    if (totalTransData.length) {
      let total = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const sale of totalTransData) {
        total += parseFloat(sale.total_amount);
      }
      setTotalSale(total);
    }
  }, [totalTransData]);
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
                  Total Tickets: {_get(eventData, 'no_of_tickets')}
                </li>
                <li className="list-group-item">
                  Total Tickets Left:{' '}
                  {_get(eventData, 'no_of_tickets') -
                    _get(eventData, 'no_of_tickets_sold')}
                </li>
                <li className="list-group-item">
                  Total Tickets Sold: {_get(eventData, 'no_of_tickets_sold')}
                </li>
                <li className="list-group-item">
                  Total Sale: {priceCalculator(totalSale, '$')}
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
      {isAdmin && (
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
                    <th>Purchased By Name</th>
                    <th>Purchased By Email</th>
                    <th>Tickets Buy</th>
                    <th>Total Amount</th>
                    <th>Purchased At</th>
                  </tr>
                </thead>
                <tbody style={{ height: '50px', overflowY: 'scroll' }}>
                  {!isLoadingTransData &&
                    !isFetchingTran &&
                    transData.map((tan, i) => (
                      <tr key={i}>
                        <td>
                          {_get(tan, 'user_id.first_name')}{' '}
                          {_get(tan, 'user_id.last_name')}
                        </td>
                        <td>{_get(tan, 'user_id.email')}</td>
                        <td>{_get(tan, 'tickets_buy')}</td>
                        <td>
                          {priceCalculator(_get(tan, 'total_amount'), '$')}
                        </td>
                        <td>
                          {moment(_get(tan, 'createdAt')).format('YYYY-MM-DD')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {(isLoadingTransData || isFetchingTran) && (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                  </Spinner>
                </div>
              )}
              {(transData.length === 0 || isError) && (
                <h3 className="text-center">No Transactions Found</h3>
              )}
              {transData.length > 0 && !isError && (
                <AdminPagination
                  paginationData={paginationData}
                  handlePageSelect={handlePageSelect}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { EventViewModal };
