import axios from "axios";
import { baseURL } from "@/constants/index";

export const CREATE_EVENT = async e => {
  const res = await axios.post(baseURL + `/v1/event`, e);
  return res.data;
};
