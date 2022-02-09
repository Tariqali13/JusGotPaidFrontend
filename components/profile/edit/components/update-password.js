import React, {useContext} from 'react';
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import { validateUpdatePassForm } from '../../validation';
import { UpdatePasswordForm } from "./update-password-form";
import {ProcessingModal} from "@/components/modal";
import {UPDATE_PASSWORD, UPDATE_USER_DATA} from '../../queries';
import { useMutation } from "react-query";
import {removeLocalStorageCred} from "@/utils/local-storage";
import Router from "next/router";
import _omit from 'lodash.omit';
import _get from 'lodash.get';
import TemplateContext from "@/layout/secure-template/context";

const UpdatePassword = () => {
  const [updatePassword,
    { isLoading: isLoadingSave,
  }] = useMutation(UPDATE_PASSWORD);
  const { userData } = useContext(TemplateContext);
  const handleLogout = () => {
    removeLocalStorageCred();
    Router.push('/login', '/login');
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          old_password: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validateUpdatePassForm}
        onSubmit={async (values, actions) => {
          await updatePassword({
            id: _get(userData, '_id', ''),
            data: _omit(values, 'confirm_password'),
          }, {
            onSuccess: async res => {
              Message.success(res);
              actions.resetForm();
              handleLogout();
            },
            onError: err => {
              Message.error(err);
              actions.resetForm();
            },
          });
        }}
      >
        {formikProps => {
          return (
            <UpdatePasswordForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
            />
          );
        }}
      </Formik>
      {(isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { UpdatePassword };
