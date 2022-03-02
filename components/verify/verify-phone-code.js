// @flow
import React, { useEffect } from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import { Formik } from 'formik';
import { Message } from '@/components/alert/message';
import { useMutation } from 'react-query';
import ProgressLoader from '@/components/loaders/progress-loader';
import { getLocalStorageValues } from '@/constants/local-storage';
import Router from 'next/router';
import { VerifyForm } from './components';
import { validateVerifyCode } from './validation';
import { VERIFY_SMS_CODE } from './queries';

const VerifyPhoneCode = () => {
  const {
    user_id,
    user_phone_number,
    user_is_verified,
  } = getLocalStorageValues();
  const [verifySmsCode, { isLoading }] = useMutation(VERIFY_SMS_CODE);

  useEffect(() => {
    if (!user_is_verified) {
      Router.push('/', '/');
    }
  }, [user_is_verified]);
  return (
    <MarketingTemplate isColorNav={false}>
      <div className="container-fluid p-5 dynamic-form">
        <div className="card my-3 w-50 mx-auto">
          <div className="card-body">
            <Formik
              enableReinitialize={true}
              initialValues={{
                user_id,
                phone_number: user_phone_number,
                code: '',
              }}
              validationSchema={validateVerifyCode}
              onSubmit={async (values, actions) => {
                await verifySmsCode(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    actions.resetForm();
                    Router.push('/', '/', { shallow: true });
                  },
                  onError: e => {
                    Message.error(e);
                  },
                });
              }}
            >
              {formikProps => {
                return <VerifyForm {...formikProps} />;
              }}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </MarketingTemplate>
  );
};
export default VerifyPhoneCode;
