// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_EVENTS_DATA = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/event/by-user/${e.id}`);
  return res.data;
};
