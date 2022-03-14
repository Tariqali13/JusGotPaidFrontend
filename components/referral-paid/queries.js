// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_REFERRAL_PAID = async (key, e) => {
  const res = await axios.get(`${baseURL}/v1/commission/all-commission`, {
    params: e,
  });
  return res.data;
};

export const TRANSFER_AMOUNT = async data => {
  const res = await axios.post(`${baseURL}/v1/stripe/transfer-stripe`, data);
  return res.data;
};

export const UPDATE_COMMISSION = async data => {
  const res = await axios.post(
    `${baseURL}/v1/register/update-cmomission-by-id/${data.id}`,
    data.data,
  );
  return res.data;
};
