import axios from "axios";
import { baseURL } from "../../constants";

export const REGISTER_USER = async e => {
  const res = await axios.post(baseURL + `/v1/register`, e);
  return res.data;
};
