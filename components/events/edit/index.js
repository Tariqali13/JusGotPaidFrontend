import React from 'react';
import SecureTemplate from '@/layout/secure-template';
import SearchHeader from '@/components/search-header';
import { Message } from '@/components/alert/message';
import Router, {useRouter} from 'next/router';
import { Formik } from 'formik';
import { getLocalStorageValues } from '@/constants/local-storage';
import {useMutation, useQuery} from 'react-query';
import ProgressLoader from '@/components/loaders/progress-loader';
import { validateAddEventForm } from '../validations';
import { EventForm } from '../create/components';
import { GET_EVENT_BY_ID, UPDATE_EVENT } from "@/components/events/queries";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import {ProcessingModal} from "@/components/modal";

const EventEdit = () => {

  const router = useRouter()
  const { eventId } = router.query;
  const [updateEvent, {isLoading: isLoadingSave}] = useMutation(UPDATE_EVENT);
  const { user_id } = getLocalStorageValues();
  const isEnabled = eventId !== undefined;
  const {
    data: eventData,
    isLoading,
  } = useQuery(['EVENT_BY_ID',
    {  id: eventId }],  GET_EVENT_BY_ID ,{
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    }
  });
  console.log('eventData', eventData);
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
                </button>{' '}
                Create Event
              </h1>
              <p className="mb-4">Create a event with proper information</p>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  influencer_id: user_id,
                  event_name: _get(eventData, 'data.event_name', ' '),
                  event_type: _get(eventData, 'data.event_type', ' '),
                  event_location:_get(eventData, 'data.event_location', ' ' ),
                  event_date: _get(eventData, 'data.event_date', ' '),
                  no_of_tickets:_get(eventData, 'data.no_of_tickets',' ') ,
                  ticket_price: _get(eventData, 'data.ticket_price', ' '),
                }}
                validationSchema={validateAddEventForm}
                onSubmit={async (values, actions) => {
                  await updateEvent( {
                    id: eventId,
                      data: values,},
                    {
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
              return (
              <EventForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
              buttonText="Update"
              />
              );}}
            </Formik>
            </div>
          </div>
        </div>
      </div>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default EventEdit;