// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_REFERRAL_USERS = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/register/get-referral-users/${e.profile_link}`);
  return res.data;
};
