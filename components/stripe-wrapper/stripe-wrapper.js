import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CLIENT_API_KEY } from '@/constants/env';

type Props = {
  children: any,
};
const StripeWrapper = (props: Props) => {
  const { children } = props;
  const stripePromise = loadStripe(STRIPE_CLIENT_API_KEY);
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
