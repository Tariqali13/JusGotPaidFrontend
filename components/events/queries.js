// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

// export const GET_EVENTS_DATA = async (key, e) => {
//   const res = await axios.get(baseURL + `/v1/event/by-user/${e.id}`);
//   return res.data;
// };

export const GET_EVENTS_DATA = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/event?events_passed=${e.passedEvents}`);
  // const res = await axios.get(baseURL + `/v1/event/${e.passedEvents}`);
  return res.data;
};

export const GET_INFLUENCER_EVENTS_DATA = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/event/influencer/${e.id}`);
  return res.data;
};

export const DELETE_EVENT = async (data) => {
  const res = await axios.delete(baseURL + `/v1/event/${data}`);
  return res.data;
};


