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

export const GET_TOTAL_REFERRAL_PAID = async () => {
  const res = await axios.get(`${baseURL}/v1/commission/total-commission`);
  return res.data;
};

export const TRANSFER_AMOUNT = async data => {
  const res = await axios.post(`${baseURL}/v1/stripe/transfer-stripe`, data);
  return res.data;
};

export const BULK_TRANSFER_AMOUNT = async data => {
  const res = await axios.post(
    `${baseURL}/v1/stripe/bulk-transfer-stripe`,
    data,
  );
  return res.data;
};

export const UPDATE_COMMISSION = async data => {
  const res = await axios.post(
    `${baseURL}/v1/register/update-commission-by-id/${data.id}`,
    data.data,
  );
  return res.data;
};

export const BULK_UPDATE_COMMISSION = async data => {
  const res = await axios.post(
    `${baseURL}/v1/register/update-bulk-commission`,
    data,
  );
  return res.data;
};
