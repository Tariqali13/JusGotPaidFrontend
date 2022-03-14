import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { Message } from '@/components/alert/message';
import Router from 'next/router';
import { Formik } from 'formik';
import { getLocalStorageValues } from '@/constants/local-storage';
import { useMutation } from 'react-query';
import ProgressLoader from '@/components/loaders/progress-loader';
import { validateAddEventForm } from '../validations';
import { EventForm } from './components';
import { CREATE_EVENT } from './queries';

const EventCreate = () => {
  const { user_id } = getLocalStorageValues();
  const [createEvent, { isLoading }] = useMutation(CREATE_EVENT);
  return (
    <SecureTemplate>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <h1 className="h3 mb-2 text-gray-800">
              <button className="btn btn-primary" onClick={() => Router.back()}>
                <i className="fas fa-arrow-left" />
              </button>{' '}
              Create Event
            </h1>
            <p className="mb-4">Create a event with proper information</p>
          </div>
        </div>
        <div className="card shadow mb-4 max-card-height">
          <div className="card-body">
            <Formik
              initialValues={{
                influencer_id: user_id,
                cover_image_id: '',
                event_name: '',
                event_type: '',
                event_location: '',
                event_date: '',
                no_of_tickets: '',
                ticket_price: '',
                images: [],
              }}
              validationSchema={validateAddEventForm}
              onSubmit={async (values, actions) => {
                if (values.cover_image_id?._id) {
                  // eslint-disable-next-line no-param-reassign
                  values.cover_image_id = values.cover_image_id._id;
                } else {
                  // eslint-disable-next-line no-param-reassign
                  delete values.cover_image_id;
                }
                if (values.images?.length) {
                  // eslint-disable-next-line no-param-reassign
                  values.images = values.images.map(im => im._id);
                } else {
                  // eslint-disable-next-line no-param-reassign
                  delete values.images;
                }
                await createEvent(values, {
                  onSuccess: async res => {
                    Message.success(res);
                    actions.resetForm();
                    await Router.push('/admin/events', '/admin/events', {
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
                return <EventForm {...formikProps} />;
              }}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading && <ProgressLoader isLoading={isLoading} />}
    </SecureTemplate>
  );
};
export default EventCreate;
