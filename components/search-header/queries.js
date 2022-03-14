import axios from 'axios';
import { baseURL } from '@/constants/index';

export const CONNECT_STRIPE = async (params: any) => {
  const res = await axios.post(`${baseURL}/v1/stripe/connect-stripe`, params);
  return res?.data;
};

export const UPDATE_USER_STRIPE_DETAILS = async (params: any) => {
  const res = await axios.patch(
    `${baseURL}/v1/register/update-stripe-account/${params.id}`,
    params.data,
  );
  return res?.data;
};
