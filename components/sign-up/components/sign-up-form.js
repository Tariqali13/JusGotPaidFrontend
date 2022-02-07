// @flow
import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';
import PhoneInput from 'react-phone-input-2';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  handleSubmit: any,
  dirty: boolean,
  isSubmitting: boolean,
  // isInfluencer?: boolean,
};

const SignUpForm = (props: Props) => {
  const [showReferralLink, setShowReferralLink] = useState(null);
  const {
    values,
    isSubmitting,
    dirty,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    // isInfluencer,
  } = props;

  return (
    <section className="page-section" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="mt-0">
              {/* Register as a {isInfluencer ? 'Influencer' : 'Patron'} */}
              Register
            </h2>
            <hr className="divider my-4" />
            <p className="text-muted mb-5">
              Ready to register yourself with us?
            </p>
          </div>
        </div>
        <form>
          <Field name="first_name">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputFirstname">First Name</label>
                  <input
                    type="text"
                    value={values.first_name}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputFirstname"
                    placeholder="Enter first name"
                    name="first_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.first_name}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>

          <Field name="last_name">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputLastName">Last Name</label>
                  <input
                    type="text"
                    value={values.last_name}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputLastName"
                    placeholder="Enter last name"
                    name="last_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.last_name}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>

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

          <Field name="phone_number">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputNo">Phone Number</label>
                  <PhoneInput
                    inputClass={`form-control ${fieldValidate(field, form)}`}
                    alue={values.phone_number}
                    onChange={phone =>
                      form.setFieldValue('phone_number', `+${phone}`)
                    }
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.phone_number}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>

          {/* <Field name="role" as="select">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputRole">Select Role</label>
                  <select
                    className="form-control"
                    id="exampleInputRole"
                    name="role"
                    onChange={(e) => {
                      setShowReferralLink(e.target.value);
                      handleChange(e)
                    }}
                    // onChange={role => {form.setFieldValue(role.target);console.log(role.target)}}
                    onBlur={handleBlur}
                  >
                    <option value="none" key={0}>Select Role</option>
                    <option value="Admin" key={1}>Admin</option>
                    <option value="Influencer" key={2}>Influencer</option>
                    <option value="Patron" key={3}>ُPatron</option>

                  </select>
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.role}
                    </small>
                  )}
                </div>
              );
            }}
          </Field> */}

          {/* {
            showReferralLink !== 'Influencer' && showReferralLink !== 'Patron'? "": (<Field name="referral_link">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputReferralLink">Referral Link</label>
                  <input
                    type="text"
                    value={values.referral_link}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputReferralLink"
                    placeholder="Enter Referral Link"
                    name="referral_link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.last_name}
                    </small>
                  )}
                </div>
              );
            }}
          </Field>)
          } */}

          <Field name="referral_link">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label htmlFor="exampleInputReferralLink">
                    Referral Link
                  </label>
                  <input
                    type="text"
                    value={values.referral_link}
                    readOnly = {values.referral_link ? true : false}
                    className={`form-control ${fieldValidate(field, form)}`}
                    id="exampleInputReferralLink"
                    placeholder="Enter Referral Link"
                    name="referral_link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {fieldValidateBool(field, form) && (
                    <small className="form-text invalid-feedback">
                      {' '}
                      {errors.last_name}
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

export { SignUpForm };
