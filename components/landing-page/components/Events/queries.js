import axios from "axios";
import { baseURL } from "../../../../constants";

export const ALL_EVENTS = async e => {
  const res = await axios.get(baseURL + `/v1/event?events_passed=false`);
  return res.data;
};
