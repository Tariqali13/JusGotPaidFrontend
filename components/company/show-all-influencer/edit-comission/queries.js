// @flow
import axios from 'axios';
import { baseURL } from '@/constants/index';
// Design Queries and Mutations Start

export const GET_USER_DATA = async (key, e) => {
  const res = await axios.get(baseURL + `/v1/register/${e.id}`);
  return res.data;
};

export const UPDATE_COMISSION = async e => {
  const body = {
    influencer_id: e.influencer_id,
    admin_id: e.admin_id,
    comission: e.comission,
  };
  const res = await axios.post(baseURL + `/v1/register/update-comission`, body);
  return res.data;
};
