// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_EVENT_DATA = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/event/${e.id}`);
  return res.data;
};

export const CREATE_TRANSACTION = async e => {
  const res = await axios.post(baseURL + `/v1/transaction`, e);
  return res.data;
};
