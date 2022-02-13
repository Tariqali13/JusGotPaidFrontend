// @flow
import React, { useState } from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router, { useRouter } from 'next/router';
import { CardElement } from '@stripe/react-stripe-js';
import { CARD_ELEMENT_OPTIONS_STYLE } from '@/constants/stripe-constants';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  handleSubmit: any,
  dirty: boolean,
  isSubmitting: boolean,
  ticketsToBuy: any,
};

const EventDetailForm = (props: Props) => {
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    dirty,
    errors,
    handleSubmit,
    ticketsToBuy,
  } = props;

  const router = useRouter();
  const { eventId, influencerId } = router.query;
  const { user_auth_token, user_role } = getLocalStorageValues();
  const [ticketDropDown, setTicketDropDown] = useState(false);
  const ticketsToMap = ticketsToBuy > 0 ? new Array(ticketsToBuy).fill('') : [];
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="form-row justify-content-center">
          <Field name="tickets_buy">
            {({ field, form }) => {
              return (
                <div className="form-group mr-3" style={{ width: '10%' }}>
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.tickets_buy}
                      </span>
                    ) : (
                      'No. of Tickets'
                    )}
                  </label>
                  <div className="dropdown">
                    <div
                      className="form-control dropdown-toggle"
                      href="#"
                      id="ticketDropDown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      // onClick={() => setTicketDropDown(!ticketDropDown)}
                      style={{ paddingLeft: '35%' }}
                    >
                      {values.tickets_buy}
                    </div>
                    <div
                      className={`dropdown-menu
                     ${ticketDropDown && 'show'}`}
                      aria-labelledby="ticketDropDown"
                      style={{ maxHeight: '200px', overflowY: 'scroll' }}
                    >
                      {ticketsToMap &&
                        ticketsToMap.map((no, i) => (
                          <div
                            onClick={() => {
                              form.setFieldValue('tickets_buy', i + 1, true);
                              form.setFieldValue(
                                'total_amount',
                                (i + 1) * values.price_per_ticket,
                                true,
                              );
                              setTicketDropDown(false);
                            }}
                            className="dropdown-item"
                          >
                            {i + 1}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            }}
          </Field>

          <Field name="total_amount">
            {() => {
              return (
                <div className="form-group ml-3" style={{ width: '10%' }}>
                  <label className="form-label">Total Amount</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      type="text"
                      disabled={true}
                      name="tickets_buy"
                      value={values.total_amount}
                      className="form-control"
                    />
                  </div>
                </div>
              );
            }}
          </Field>
        </div>

        {/* <div className="form-row justify-content-center">
          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <Field name="referral_link">
              {() => {
                return (
                  <div className="form-group ml-3">
                    <label className="form-label">Reference</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="referral_link"
                        value={values.referral_link}
                        className="form-control"
                        placeholder="Enter reference link"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                );
              }}
            </Field>
          </div>
        </div> */}
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12">
        {!user_auth_token && (
          <div className="form-row justify-content-center">
            <div className="form-group">
              <button
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  localStorage.setItem('event_id', eventId);
                  localStorage.setItem('influencer_id', influencerId);
                  Router.push('/register', '/register');
                }}
              >
                Register
              </button>
            </div>
            <div className="form-group ml-5">
              <button
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  localStorage.setItem('event_id', eventId);
                  localStorage.setItem('influencer_id', influencerId);
                  Router.push('/login', '/login');
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
        <React.Fragment>
          {/* {user_auth_token && user_role === 'Patron' && ( */}
          {user_auth_token && (
            <div className="form-row justify-content-center">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <div className="form-group" style={{ width: '500px' }}>
                  <label className="mr-sm-2">Enter your card info</label>
                  <div className="input-group">
                    <CardElement
                      name="token"
                      className="form-control card-padding"
                      options={CARD_ELEMENT_OPTIONS_STYLE}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
        <React.Fragment>
          {/* {user_auth_token && user_role === 'Patron' && ( */}
          {user_auth_token && (
            <div className="form-row justify-content-center">
              <div className="form-group">
                <button
                  disabled={!dirty || isSubmitting}
                  className="btn btn-primary"
                  onClick={e => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};
export { EventDetailForm };
