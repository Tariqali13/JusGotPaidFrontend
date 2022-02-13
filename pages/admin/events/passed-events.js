// @flow
import React from 'react';
import EventsManager from '@/components/events';
import SecureTemplate from "@/layout/secure-template";

const PassedEvents = () => {
  return  (
    <SecureTemplate>
      <EventsManager passedEvents={true} />
    </SecureTemplate>
  );
};

export default PassedEvents;
