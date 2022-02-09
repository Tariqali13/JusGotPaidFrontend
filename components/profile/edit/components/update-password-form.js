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

const UpdatePasswordForm = (props: Props) => {
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
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="old_password">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.old_password}
                    </span>
                  ) : (
                    'Old Password'
                  )}
                </label>
                <input
                  type="text"
                  name="old_password"
                  value={values.old_password}
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
        <Field name="password">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.password}
                    </span>
                  ) : (
                    'Password'
                  )}
                </label>
                <input
                  type="text"
                  name="password"
                  value={values.password}
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
        <Field name="confirm_password">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.confirm_password}
                    </span>
                  ) : (
                    'Confirm Password'
                  )}
                </label>
                <input
                  type="text"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12">
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export { UpdatePasswordForm };
