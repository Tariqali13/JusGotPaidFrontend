// @flow
import React from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';
import Link from 'next/link';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  handleSubmit: any,
  dirty: boolean,
  isSubmitting: boolean,
};

const LoginForm = (props: Props) => {
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
            <h2 className="mt-0">
              Login
            </h2>
            <hr className="divider my-4" />
            <p className="text-muted mb-5">Ready to Login yourself with us?</p>
          </div>
        </div>
        <form>
          <Field name="email">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    value={values.email}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.email}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>

          <Field name="password">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputPass">Password</label>
                  <input
                    type="password"
                    value={values.password}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputPass"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.password}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>
          
          <div className="row">
            <div className="col-xl-12">
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
            Login
          </button>
            </div>
            <div className="col-xl-12 pt-2">
              <Link href="/forget-password" as="forget-password">
                <a style={{color: 'blue', fontSize: '18px'}}>
                Forgot password
                </a>
              </Link>
            </div>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export { LoginForm };
