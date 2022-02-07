// @flow
import React from 'react';
import EventDetail from '@/components/events/detail';
import StripeWrapper from '@/components/stripe-wrapper';

const Event = () => {
  return (
    <StripeWrapper>
      <EventDetail />
    </StripeWrapper>
  );
};

export default Event;
