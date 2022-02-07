// @flow
import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { Message } from '@/components/alert/message';
import Router from 'next/router';
import { Formik } from 'formik';
import { getLocalStorageValues } from '@/constants/local-storage';
import { useQuery, useMutation } from 'react-query';
import reactQueryConfig from '@/constants/react-query-config';
import _get from 'lodash/get';
import ProgressLoader from '@/components/loaders/progress-loader';
import { validateUpdateComissionForm } from './validations';
import { EditComissionForm } from './components';
import { GET_USER_DATA, UPDATE_COMISSION } from './queries';
import { useRouter } from 'next/router';

const EditComission = () => {
  const router = useRouter();
  const { influencerId } = router.query;
  const { user_id } = getLocalStorageValues();
  const [updateComission, { isLoading }] = useMutation(UPDATE_COMISSION);
  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    ['USER_DATA', { id: influencerId }],
    GET_USER_DATA,
    {
      ...reactQueryConfig,
    },
  );
  
  // let influencer_id = _get(userData, 'data._id');

  return (
    <SecureTemplate>
      <div id="content">
        <SearchHeader />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <h1 className="h3 mb-2 text-gray-800">
                <button
                  className="btn btn-primary"
                  onClick={() => Router.back()}
                >
                  <i className="fas fa-arrow-left" />
                </button>{'  '}
                Influencers
                {/* {_get(userData, 'data.last_name')} */}
              </h1>
              <p className="mb-4 ml-5">Update Influencer Commission</p>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">

              <Formik
                enableReinitialize={true}
                initialValues={{
                  influencer_id: influencerId,
                  admin_id: user_id,
                  first_name: _get(userData, 'data.first_name'),
                  last_name: _get(userData, 'data.last_name'),
                  email: _get(userData, 'data.email'),
                  phone_number: _get(userData, 'data.phone_number'),
                  comission: _get(userData, 'data.comission'),
                }}
                validationSchema={validateUpdateComissionForm}
                onSubmit={async (values, actions) => {
                  await updateComission(values, {
                    onSuccess: async res => {
                      Message.success(res);
                      actions.resetForm();
                      await Router.push('/admin/influencer', '/admin/influencer', {
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
                  return <EditComissionForm {...formikProps} />;
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {isUserDataLoading && <ProgressLoader isLoading={isUserDataLoading} />}
    </SecureTemplate>
  );
};

export default EditComission;
