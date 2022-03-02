import React, { useState } from 'react';
import { Field } from 'formik';
import { fieldValidate, fieldValidateBool } from '@/utils/form-utils';
import { Message } from '@/components/alert/message';
import _get from 'lodash.get';
import { useMutation } from 'react-query';
import { UPDATE_STORAGE_FILE } from '@/components/uppy-file-uploader/queries';
import UppyFileUploader from '@/components/uppy-file-uploader';
import { imageTypes } from '@/constants/file-types';
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
  buttonText: string,
  setFieldValue: any,
};

const EventForm = (props: Props) => {
  const {
    values,
    isSubmitting,
    dirty,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    buttonText,
    setFieldValue,
  } = props;
  const [updateFile, { isLoading: isLoadingUpdateFile }] = useMutation(
    UPDATE_STORAGE_FILE,
  );
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(false);
  const handleUploadDone = async data => {
    if (_get(values, 'cover_image_id._id', '')) {
      await handleRemoveImage(_get(values, 'cover_image_id._id', ''));
    }
    setFieldValue('cover_image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id);
  };
  const [isMultiFilesUploading, setIsLoadingMultiFiles] = useState(false);
  const [imageUploadModalMulti, setImageModalOpenMulti] = useState(false);
  const toggleImageModalMulti = () =>
    setImageModalOpenMulti(!imageUploadModalMulti);
  const handleUploadDoneMulti = res => {
    const newData = [...values.images, ..._get(res, 'data', [])];
    setFieldValue('images', newData, true);
  };
  const handleRemoveImageMulti = async id => {
    await updateFile(id, {
      onSuccess: () => {
        const filterData = values.images.filter(pic => pic._id !== id);
        setFieldValue('images', filterData, true);
      },
      onError: () => {
        const otherOptions = {
          message: 'Error in removing file',
        };
        Message.error(null, otherOptions);
      },
    });
  };
  const handleUploadImagesMulti = () => {
    setImageModalOpenMulti(true);
  };
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Field name="event_name">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_name}
                    </span>
                  ) : (
                    'Event Name'
                  )}
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={values.event_name}
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
        <Field name="event_type">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_type}
                    </span>
                  ) : (
                    'Event Type'
                  )}
                </label>
                <input
                  type="text"
                  name="event_type"
                  value={values.event_type}
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
        <Field name="event_date">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_date}
                    </span>
                  ) : (
                    'Event Date'
                  )}
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={values.event_date}
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
        <Field name="event_location">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.event_location}
                    </span>
                  ) : (
                    'Event Location'
                  )}
                </label>
                <input
                  type="text"
                  name="event_location"
                  value={values.event_location}
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
        <Field name="no_of_tickets">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.no_of_tickets}
                    </span>
                  ) : (
                    'No of Tickets'
                  )}
                </label>
                <input
                  type="text"
                  name="no_of_tickets"
                  value={values.no_of_tickets}
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
        <Field name="ticket_price">
          {({ field, form }) => {
            return (
              <div className="form-group">
                <label className="form-label">
                  {fieldValidateBool(field, form) ? (
                    <span
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.ticket_price}
                    </span>
                  ) : (
                    'Ticket Price'
                  )}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="text"
                    name="ticket_price"
                    value={values.ticket_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${fieldValidate(field, form)}`}
                  />
                </div>
              </div>
            );
          }}
        </Field>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <hr className="my-4 card-line" />
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12">
        {_get(values, 'cover_image_id.file_url', '') && (
          <div className="mx-auto text-center">
            <Badge
              bg="danger"
              className="badge-circle bg-primary position-absolute top-0 start-100 translate-middle p-2 image-remove-icon"
              onClick={() => setImageModalOpen(true)}
            >
              <i className="fa fa-edit" />
            </Badge>
            <img
              className="card-img-top rounded ml-1 w-50"
              src={_get(values, 'cover_image_id.file_url', '')}
              alt="Card image cap"
            />
          </div>
        )}
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-content-center justify-content-center">
        {!_get(values, 'cover_image_id.file_url', '') && (
          <button
            className="btn btn-primary mt-3"
            onClick={() => setImageModalOpen(true)}
          >
            Upload Cover Image
          </button>
        )}
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <hr className="my-4 card-line" />
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center justify-content-center flex-column my-3">
        <button
          className="btn btn-primary mt-3"
          onClick={handleUploadImagesMulti}
        >
          Upload Event Images
        </button>
        <div className="row w-100">
          {_get(values, 'images', []).map((image, i) => (
            <div className="col-4 my-3" key={i}>
              <Badge
                bg="danger"
                className="badge-circle bg-danger position-absolute image-remove-icon
                            text-white image-badge badge-floating border-white"
                onClick={() => handleRemoveImageMulti(image._id)}
              >
                <i className="fa fa-trash" />
              </Badge>
              <img
                className="card-img-top rounded w-100 ml-1"
                src={_get(image, 'file_url', '')}
                alt="Card image cap"
              />
            </div>
          ))}
        </div>
      </div>
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
            {buttonText || 'Submit'}
          </button>
        </div>
      </div>
      {imageUploadModal && (
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
      )}
      {imageUploadModalMulti && (
        <UppyFileUploader
          maxFileSize={100}
          maxNumberOfFiles={10}
          acceptFileTypes={imageTypes}
          open={imageUploadModalMulti}
          isMulti={true}
          axiosMethod="post"
          handleClose={toggleImageModalMulti}
          uploadUrl="storage-file/multiple-files"
          setOpenImageModal={setImageModalOpenMulti}
          handleUploadDone={handleUploadDoneMulti}
          setIsLoadingMultiFiles={setIsLoadingMultiFiles}
        />
      )}
      {(isLoadingUpdateFile || isMultiFilesUploading) && <ProcessingModal />}
    </div>
  );
};
export { EventForm };
