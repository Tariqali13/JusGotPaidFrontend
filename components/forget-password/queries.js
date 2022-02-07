import axios from "axios";
import { baseURL } from "../../constants";

export const FORGET_PASSWORD = async e => {
  const res = await axios.post(baseURL + `/v1/login/forgot-password`, e);
  return res.data;
};
