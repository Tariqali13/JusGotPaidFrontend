// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import _get from 'lodash/get';
import { Formik } from 'formik';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Message } from '@/components/alert/message';
import _omit from 'lodash.omit';
import { getLocalStorageValues } from '@/constants/local-storage';
import ProgressLoader from '@/components/loaders/progress-loader';
import ReactOwlCarousel from '@/components/react-owl-carousel';
import { GET_EVENT_DATA, CREATE_TRANSACTION } from './queries';
import { EventDetailForm } from './components';
import { validateBuyEventForm } from './validation';

const EventDetail = () => {
  const router = useRouter();
  const { eventId, influencerId } = router.query;
  const { user_id } = getLocalStorageValues();
  const { data: eventData, isLoading: isEventDataLoading, refetch } = useQuery(
    ['EVENT_DATA', { id: eventId }],
    GET_EVENT_DATA,
    {
      ...reactQueryConfig,
    },
  );
  const [createTransaction, { isLoading }] = useMutation(CREATE_TRANSACTION);
  const ticketsToBuy =
    _get(eventData, 'data.no_of_tickets', 0) -
    _get(eventData, 'data.no_of_tickets_sold', 0);
  const stripe = useStripe();
  const elements = useElements();
  const createStripeToken = async () => {
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      console.log(result);
    }
    cardElement.clear();
    return result;
  };
  return (
    <MarketingTemplate isColorNav={false} showMenu={false}>
      <section className="my-3" id="contact">
        <div className="container">
          <div className="container">
            {_get(eventData, 'data.cover_image_id.file_url', '') && (
              <img
                alt="cover-image"
                className="w-100"
                src={_get(eventData, 'data.cover_image_id.file_url', '')}
              />
            )}
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="mt-0">Event Detail</h2>
                <hr className="divider my-4" />
                <p className="text-muted mb-5">
                  Detail about event and purchase
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Name: {_get(eventData, 'data.event_name')}
                  </li>
                  <li className="list-group-item">
                    Type: {_get(eventData, 'data.event_type')}
                  </li>
                  <li className="list-group-item">
                    Date: {_get(eventData, 'data.event_date')}
                  </li>
                  <li className="list-group-item">
                    Location: {_get(eventData, 'data.event_location')}
                  </li>
                  <li className="list-group-item">
                    No of Tickets Left: {ticketsToBuy}
                  </li>
                  <li className="list-group-item">
                    Price per ticket: ${_get(eventData, 'data.ticket_price', 0)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              event_id: _get(eventData, 'data._id'),
              user_id,
              // influencer_id: influencerId,
              referral_link: '',
              tickets_buy: 1,
              total_amount: 1 * _get(eventData, 'data.ticket_price', 0),
              price_per_ticket: _get(eventData, 'data.ticket_price', 0),
              // Reference: '',
              card_token: '',
            }}
            validationSchema={validateBuyEventForm}
            onSubmit={async (values, actions) => {
              const result = await createStripeToken();
              await createTransaction(
                _omit(
                  {
                    ...values,
                    card_token: _get(result, 'token.id'),
                    total_amount: values.tickets_buy * values.price_per_ticket,
                  },
                  'price_per_ticket',
                ),
                {
                  onSuccess: async () => {
                    await refetch();
                    Message.success('', {
                      message: 'Purchased Successfully. Check your mail',
                    });
                    actions.resetForm();
                    // await Router.push('/admin/events', '/admin/events', {
                    //   shallow: true,
                    // });
                  },
                  onError: e => {
                    Message.error(e);
                  },
                },
              );
            }}
          >
            {formikProps => {
              return (
                <EventDetailForm {...formikProps} ticketsToBuy={ticketsToBuy} />
              );
            }}
          </Formik>
        </div>
        <div className="my-5">
          {_get(eventData, 'data.images', []).length > 0 && (
            <ReactOwlCarousel>
              {_get(eventData, 'data.images', []).map((im, i) => (
                <div className="item" key={i}>
                  <img
                    alt="cover-image"
                    className="w-100"
                    src={_get(im, 'file_url', '')}
                  />
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </section>
      {(isEventDataLoading || isLoading) && (
        <ProgressLoader isLoading={isEventDataLoading || isLoading} />
      )}
    </MarketingTemplate>
  );
};
export default EventDetail;
