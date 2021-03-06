// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import { Formik } from 'formik';
import { Message } from '@/components/alert/message';
import { useMutation } from 'react-query';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import Router from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
import { ForgetPasswordForm } from './components';
import { validateForgetPassword } from './validation';
import { FORGET_PASSWORD } from './queries';

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useMutation(FORGET_PASSWORD);
  return (
    <MarketingTemplate isColorNav={false}>
      <div className="container-fluid p-5 dynamic-form">
        <div className="card my-3 w-50 mx-auto">
          <div className="card-body">
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={validateForgetPassword}
              onSubmit={async (values, actions) => {
                await forgetPassword(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    Router.push('/login', '/login', {
                      shallow: true,
                    });
                  },
                  onError: e => {
                    Message.error(e);
                  },
                });
              }}
            >
              {formikProps => {
                return <ForgetPasswordForm {...formikProps} />;
              }}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </MarketingTemplate>
  );
};
export default ForgetPassword;
