import React, { useState } from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';
import _get from 'lodash.get';
import { imageTypes } from '@/constants/file-types';
import { useMutation } from 'react-query';
import { UPDATE_STORAGE_FILE } from '@/components/uppy-file-uploader/queries';
import UppyFileUploader from '@/components/uppy-file-uploader';
import { ProcessingModal } from '@/components/modal';
import { Badge } from 'reactstrap';

type Props = {
  values: any,
  handleChange: Function,
  handleBlur: Function,
  errors: any,
  handleSubmit: any,
  dirty: boolean,
  isSubmitting: boolean,
  setFieldValue: any,
};

const EditProfileForm = (props: Props) => {
  const {
    values,
    isSubmitting,
    dirty,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    setFieldValue,
  } = props;
  const [updateFile, { isLoading: isLoadingUpdateFile }] = useMutation(
    UPDATE_STORAGE_FILE,
  );
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(false);
  const handleUploadDone = async data => {
    if (_get(values, 'image_id._id', '')) {
      await handleRemoveImage(_get(values, 'image_id._id', ''));
    }
    setFieldValue('image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id);
  };
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center justify-content-center flex-column mb-5">
        {!_get(values, 'image_id.file_url', '') && (
          <img
            className="card-img-top rounded-circle w-20"
            src="/img/avatar.png"
            alt="Card image cap"
          />
        )}
        {!_get(values, 'image_id.file_url', '') && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => setImageModalOpen(true)}
          >
            {!_get(values, 'image_id.file_url', '')
              ? 'Upload Image'
              : 'Update Image'}
          </button>
        )}
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 mb-5">
        {_get(values, 'image_id.file_url', '') && (
          <div className="mx-auto text-center">

            <img
              style={{ height: '150px' }}
              className="rounded-circle ml-1 w-20"
              src={_get(values, 'image_id.file_url', '')}
              alt="Card image cap"
            />
            <Badge
              bg="danger"
              className="badge-circle bg-primary position-absolute top-0 left-0 start-100 translate-middle p-2 avatar-image-remove-icon"
              onClick={() => setImageModalOpen(true)}
            >
              <i className="fa fa-edit" />
            </Badge>
          </div>
        )}
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="first_name">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.first_name}
                    </span>
                  ) : (
                    'First Name'
                  )}
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="last_name">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.last_name}
                    </span>
                  ) : (
                    'Last Name'
                  )}
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="phone_number">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.phone_number}
                    </span>
                  ) : (
                    'Phone Number'
                  )}
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-control ${fieldValidate(field, form)}`}
                />
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12"></div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="form-group">
          <button
            disabled={!dirty || isSubmitting}
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              handleSubmit();
              if (Object.keys(errors).length > 0) {
                Message.errorMultiLine(errors, 'Failure');
              }
            }}
          >
            Update
          </button>
        </div>
      </div>
      <UppyFileUploader
        maxFileSize={30}
        maxNumberOfFiles={1}
        acceptFileTypes={imageTypes}
        open={imageUploadModal}
        isMulti={false}
        axiosMethod="post"
        handleClose={toggleImageModal}
        uploadUrl="storage-file"
        setOpenImageModal={setImageModalOpen}
        performFunc={handleUploadDone}
      />
      {isLoadingUpdateFile && <ProcessingModal />}
    </div>
  );
};
export { EditProfileForm };
