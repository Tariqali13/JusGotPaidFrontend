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
};

const EditComissionForm = (props: Props) => {
  const {
    values,
    isSubmitting,
    dirty,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
  } = props;
  return (
    <div className="container col-8">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="first_name">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.first_name}
                      </span>
                    ) : (
                      'First Name'
                    )}
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              );
            }}
          </Field>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="last_name">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.last_name}
                      </span>
                    ) : (
                      'Last Name'
                    )}
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              );
            }}
          </Field>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="email">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.email}
                      </span>
                    ) : (
                      'Email'
                    )}
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              );
            }}
          </Field>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="phone_number">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.phone_number}
                      </span>
                    ) : (
                      'Phone Number'
                    )}
                  </label>
                  <input
                    type="text"
                    readOnly
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              );
            }}
          </Field>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="comission">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.comission}
                      </span>
                    ) : (
                      'Commission'
                    )}
                  </label>
                  <input
                    type="text"
                    name="comission"
                    value={values.comission}
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { EditComissionForm };
