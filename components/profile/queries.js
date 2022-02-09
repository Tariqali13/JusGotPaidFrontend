import axios from "axios";
import {baseURL} from "@/constants/index";

export const GET_ABOUT_DATA = async () => {
  const res = await axios.get(
    baseURL + `/v1/about`,
  );
  return res?.data;
};

export const UPDATE_USER_DATA = async data => {
  const res = await axios.patch(`${baseURL}/v1/register/${data.id}`,
    data.data,
  );
  return res?.data;
};

export const UPDATE_ABOUT_DATA = async data => {
  const res = await axios.patch(`${baseURL}/v1/about/${data.id}`,
    data.data,
  );
  return res?.data;
};

export const UPDATE_PASSWORD = async data => {
  const res = await axios.patch(`${baseURL}/v1/register/update-password/${data.id}`,
    data.data,
  );
  return res?.data;
};
