import axios from 'axios';
import { baseURL } from '@/constants/index';

export const GET_USER_BY_ID = async (key: any, params: any) => {
  const res = await axios.get(`${baseURL}/v1/register/${params.userId}`);
  return res?.data;
};

export const CONNECT_STRIPE = async (params: any) => {
  const res = await axios.post(`${baseURL}/v1/stripe/connect-stripe`, params);
  return res?.data;
};
