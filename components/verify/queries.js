import axios from "axios";
import { baseURL } from "../../constants";

export const VERIFY_SMS_CODE = async e => {
  const res = await axios.post(baseURL + `/v1/verify/sms-code`, e);
  return res.data;
};
