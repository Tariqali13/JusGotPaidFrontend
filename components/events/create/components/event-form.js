// @flow
import React from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  handleSubmit: any,
  dirty: boolean,
  isSubmitting: boolean,
  buttonText: string,
};

const EventForm = (props: Props) => {
  const {
    values,
    isSubmitting,
    dirty,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    buttonText,
  } = props;
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="event_name">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_name}
                    </span>
                  ) : (
                    'Event Name'
                  )}
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={values.event_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="event_type">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_type}
                    </span>
                  ) : (
                    'Event Type'
                  )}
                </label>
                <input
                  type="text"
                  name="event_type"
                  value={values.event_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="event_date">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_date}
                    </span>
                  ) : (
                    'Event Date'
                  )}
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={values.event_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="event_location">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_location}
                    </span>
                  ) : (
                    'Event Location'
                  )}
                </label>
                <input
                  type="text"
                  name="event_location"
                  value={values.event_location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="no_of_tickets">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.no_of_tickets}
                    </span>
                  ) : (
                    'No of Tickets'
                  )}
                </label>
                <input
                  type="text"
                  name="no_of_tickets"
                  value={values.no_of_tickets}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="ticket_price">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.ticket_price}
                    </span>
                  ) : (
                    'Ticket Price'
                  )}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="text"
                    name="ticket_price"
                    value={values.ticket_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <button
            disabled={!dirty || isSubmitting}
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              handleSubmit();
              if (Object.keys(errors).length > 0) {
                Message.errorMultiLine(errors, 'Failure');
              }
            }}
          >
            {buttonText || 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};
export { EventForm };
