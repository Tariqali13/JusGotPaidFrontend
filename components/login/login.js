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
import { LoginForm } from './components';
import { validateLoginForm } from './validation';
import { LOGIN_USER } from './queries';

const Login = () => {
  const { event_id, influencer_id } = getLocalStorageValues();
  const [loginUser, { isLoading }] = useMutation(LOGIN_USER);
  return (
    <MarketingTemplate isColorNav={false}>
      <div className="container-fluid p-5 dynamic-form">
        <div className="card my-3 w-50 mx-auto">
          <div className="card-body">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validateLoginForm}
              onSubmit={async (values, actions) => {
                await loginUser(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    await localStorage.setItem(
                      'user_email',
                      _get(res, 'data._doc.email'),
                    );
                    await localStorage.setItem(
                      'user_id',
                      _get(res, 'data._doc._id'),
                    );
                    await localStorage.setItem(
                      'user_phone_number',
                      _get(res, 'data._doc.phone_number'),
                    );
                    await localStorage.setItem(
                      'user_is_verified',
                      _get(res, 'data._doc.is_verified'),
                    );
                    await localStorage.setItem(
                      'user_role',
                      _get(res, 'data._doc.role'),
                    );
                    await localStorage.setItem(
                      'user_auth_token',
                      _get(res, 'data.jwt_token'),
                    );
                    await localStorage.setItem(
                      'profile_link',
                      _get(res, 'data._doc.profile_link'),
                    );
                    actions.resetForm();
                    if (_get(res, 'data._doc.role')) {
                      Router.push('/admin/dashboard', '/admin/dashboard', {
                        shallow: true,
                      });
                    }

                    // else if (!event_id && !influencer_id) {
                    //   Router.push('/', '/', {
                    //     shallow: true,
                    //   });
                    // } else if (event_id && influencer_id) {
                    //   Router.push(
                    //     '/influencer/[influencerId]/event/[eventId]',
                    //     `/influencer/${influencer_id}/event/${event_id}`,
                    //     {
                    //       shallow: true,
                    //     },
                    //   );
                    // }
                  },
                  onError: e => {
                    Message.error(e);
                    Router.push('/register', '/register', {
                      shallow: true,
                    });
                  },
                });
              }}
            >
              {formikProps => {
                return <LoginForm {...formikProps} />;
              }}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </MarketingTemplate>
  );
};
export default Login;
