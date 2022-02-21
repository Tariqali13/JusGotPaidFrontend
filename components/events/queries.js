// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_EVENT_BY_ID = async (key, e) => {
  const res = await axios.get(`${baseURL}/v1/event/${e.id}`);
  return res.data;
};

export const GET_EVENTS_DATA = async (key, e) => {
  const res = await axios.get(`${baseURL}/v1/event`, {
    params: e,
  });
  return res.data;
};

export const GET_INFLUENCER_EVENTS_DATA = async (key, e) => {
  const res = await axios.get(`${baseURL}/v1/event/influencer/${e.id}`);
  return res.data;
};

export const DELETE_EVENT = async data => {
  const res = await axios.delete(`${baseURL}/v1/event/${data}`);
  return res.data;
};

export const UPDATE_EVENT = async e => {
  const res = await axios.patch(`${baseURL}/v1/event/${e.id}`, e.data);
  return res.data;
};

export const UPDATE_EVENT_HIDDEN = async e => {
  const res = await axios.patch(`${baseURL}/v1/event/hidden/${e.id}`, e.data);
  return res.data;
};
