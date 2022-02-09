import axios from "axios";
import {baseURL} from "@/constants/index";

export const GET_USER_BY_ID = async (key: any, params: any) => {
  const res = await axios.get(baseURL + `/v1/register/${params.userId}`);
  return res?.data;
};
