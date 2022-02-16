import React from 'react';
import EventsManager from '@/components/events';
import SecureTemplate from '@/layout/secure-template';

const HiddenEvents = () => {
  return (
    <SecureTemplate>
      <EventsManager hiddenEvents={true} />
    </SecureTemplate>
  );
};

export default HiddenEvents;
