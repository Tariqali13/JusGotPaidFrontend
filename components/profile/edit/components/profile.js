import React, { useContext } from 'react';
import { Formik } from 'formik';
import _get from 'lodash.get';
import { validateEditProfileForm } from '@/components/profile/validation';
import { Message } from '@/components/alert/message';
import Router from 'next/router';
import { EditProfileForm } from '@/components/profile/edit/components/edit-profile-form';
import { useMutation } from 'react-query';
import { UPDATE_USER_DATA } from '@/components/profile/queries';
import TemplateContext from '@/layout/secure-template/context';
import ProgressLoader from '@/components/loaders/progress-loader';

const Profile = () => {
  const { userData, refetchUserData } = useContext(TemplateContext);
  const [updateUser, { isLoading }] = useMutation(UPDATE_USER_DATA);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          image_id: _get(userData, 'image_id', {}),
          // influencer_id: user_id,
          first_name: _get(userData, 'first_name', ''),
          last_name: _get(userData, 'last_name', ''),
          email: _get(userData, 'email', ''),
          phone_number: _get(userData, 'phone_number', ''),
        }}
        validationSchema={validateEditProfileForm}
        onSubmit={async (values, actions) => {
          if (values.image_id?._id) {
            // eslint-disable-next-line no-param-reassign
            values.image_id = values.image_id._id;
          } else {
            // eslint-disable-next-line no-param-reassign
            delete values.image_id;
          }
          await updateUser(
            {
              id: _get(userData, '_id'),
              data: values,
            },
            {
              onSuccess: async res => {
                await refetchUserData();
                Message.success(res);
                actions.resetForm();
                await Router.push('/admin/profile', '/admin/profile', {
                  shallow: true,
                });
              },
              onError: e => {
                Message.error(e);
              },
            },
          );
        }}
      >
        {formikProps => {
          return <EditProfileForm {...formikProps} />;
        }}
      </Formik>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </>
  );
};

export { Profile };
