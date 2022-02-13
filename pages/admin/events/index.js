// @flow
import React from 'react';
import EventsManager from '@/components/events';
import SecureTemplate from "@/layout/secure-template";

const Events = () => {
  return (
    <SecureTemplate>
      <EventsManager passedEvents={false} />
    </SecureTemplate>
  );
};

export default Events;
