import React from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { FormGroup, Label, Input } from 'reactstrap';
import _get from 'lodash.get';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  feeToPay: any,
};

const PayModal = (props: Props) => {
  const { values, handleChange, handleBlur, errors, feeToPay } = props;
  const amountToPay =
    _get(feeToPay, 'total_amount', 0) - _get(feeToPay, 'amount_paid', 0);
  return (
    <div className="row">
      <h4 className="w-100 text-center my-3">
        Total Amount to Pay ${amountToPay}
      </h4>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="amount_type">
          {() => {
            return (
              <div className="form-group">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="amount_type"
                      value="full_amount"
                      checked={values.amount_type === 'full_amount'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{' '}
                    Pay Full Amount
                  </Label>
                </FormGroup>
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="amount_type">
          {() => {
            return (
              <div className="form-group">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="amount_type"
                      value="manual_amount"
                      checked={values.amount_type === 'manual_amount'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />{' '}
                    Pay Manual Amount
                  </Label>
                </FormGroup>
              </div>
            );
          }}
        </Field>
      </div>
      {values.amount_type === 'manual_amount' && (
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Field name="manual_amount">
            {({ field, form }) => {
              return (
                <div className="form-group">
                  <label className="form-label">
                    {fieldValidateBool(field, form) ? (
                      <span
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {errors.manual_amount}
                      </span>
                    ) : (
                      'Manual Amount'
                    )}
                  </label>
                  <input
                    type="number"
                    name="manual_amount"
                    value={values.manual_amount}
                    onChange={e => {
                      if (e.target.value <= amountToPay) {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              );
            }}
          </Field>
        </div>
      )}
    </div>
  );
};

export { PayModal };
