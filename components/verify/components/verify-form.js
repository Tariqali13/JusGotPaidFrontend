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

const VerifyForm = (props: Props) => {
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
    <section className="page-section" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="mt-0">Verification</h2>
            <hr className="divider my-4" />
            <p className="text-muted mb-5">
              Please enter the code you received on your number.
              <br />
              If you didn't receive any code please
              register again and verify number.
            </p>
          </div>
        </div>
        <form>
          <Field name="code">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputFirstname">
                    SMS Verification Code
                  </label>
                  <input
                    type="text"
                    value={values.code}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputFirstname"
                    placeholder="Enter verification code your received"
                    name="code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.code}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!dirty || isSubmitting}
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
        </form>
      </div>
    </section>
  );
};

export { VerifyForm };
