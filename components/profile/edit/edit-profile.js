import React, {useContext} from 'react'
import SecureTemplate from "@/layout/secure-template";
import SearchHeader from "@/components/search-header";
import Router from "next/router";
import {Formik} from "formik";
import {validateEditProfileForm} from "@/components/profile/validation";
import {EditProfileForm} from "@/components/profile/edit/components";
import { Tabs, Tab } from 'react-bootstrap';
import  { UpdatePassword } from "@/components/profile/edit/components";
import TemplateContext from "@/layout/secure-template/context";
import _get from 'lodash.get';
import { useMutation } from "react-query";
import { UPDATE_USER_DATA } from '../queries';
import {Message} from "@/components/alert/message";
import ProgressLoader from "@/components/loaders/progress-loader";

const EditProfile = () => {
  const { userData, refetchUserData } = useContext(TemplateContext);
  const [updateUser, { isLoading }] = useMutation(UPDATE_USER_DATA);
  // const { user_id } = getLocalStorageValues();
  // const [createEvent, { isLoading }] = useMutation(CREATE_EVENT);
  return(
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
                </button>{' '}
               Edit Profile
              </h1>
              <p className="mb-4">Proper information</p>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
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
                      await updateUser({
                        id: _get(userData, '_id'),
                        data: values,
                      }, {
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
                      });
                    }}
                  >
                    {formikProps => {
                      return <EditProfileForm {...formikProps} />;
                    }}
                  </Formik>
                </Tab>
                <Tab eventKey="update_password" title="Update Password">
                  <UpdatePassword />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        {isLoading && <ProgressLoader isLoading={isLoading} />}
      </div>
  )
}
export default EditProfile ;
