// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_INFLUENCERS_DATA = async (key, e) => {
  // const res = await axios.get(baseURL + `/v1/register/get-referral-users/${e.profile_link}`);
  const res = await axios.get(`${baseURL}/v1/register/`);
  return res.data;
};

export const DELETE_INFLUENCER = async data => {
  const res = await axios.delete(`${baseURL}/v1/register/${data}`);
  return res.data;
};

export const SUSPEND_INFLUENCER = async e => {
  const res = await axios.patch(
    `${baseURL}/v1/register/status/${e.id}`,
    e.data,
  );
  return res.data;
};
