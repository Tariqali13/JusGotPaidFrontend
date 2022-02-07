// @flow
import React from 'react';
import MarketingTemplate from '@/layout/marketing-template';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Message } from '@/components/alert/message';
import { useMutation } from 'react-query';
import ProgressLoader from '@/components/loaders/progress-loader';
import _get from 'lodash/get';
import Router from 'next/router';
import { SignUpForm } from './components';
import { validateSignUpForm } from './validation';
import { REGISTER_USER } from './queries';

const SignUp = () => {
  const router = useRouter();
  const { referral_link } = router.query;
  const [registerUser, { isLoading }] = useMutation(REGISTER_USER);
  return (
    <MarketingTemplate isColorNav={true}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          // role: '',
          referral_link: referral_link || '',
        }}
        validationSchema={validateSignUpForm}
        onSubmit={async (values, actions) => {
          await registerUser(values, {
            onSuccess: async res => {
              Message.success(res);
              actions.resetForm();
              await localStorage.setItem(
                'user_is_verified',
                _get(res, 'data.is_verified'),
              );
              await localStorage.setItem('user_id', _get(res, 'data._id'));
              await localStorage.setItem(
                'user_phone_number',
                _get(res, 'data.phone_number'),
              );
              Router.push('/verify-code', '/verify-code', { shallow: true });
            },
            onError: e => {
              Message.error(e);
            },
          });
        }}
      >
        {formikProps => {
          return <SignUpForm {...formikProps} />;
        }}
      </Formik>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </MarketingTemplate>
  );
};

SignUp.defaultProps = {
  isInfluencer: false,
};

export default SignUp;
