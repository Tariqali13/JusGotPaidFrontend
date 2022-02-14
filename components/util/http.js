import axios from 'axios';

export const http_req = async (
  apiUrl,
  callType, // POST or GET
  data,
) => {
  try {
    const axiosCallObject = {
      method: callType,
      url: apiUrl,
      data,
    };
    const res = await axios(axiosCallObject);
    return {
      ...res?.data,
    };
  } catch (err) {
    const noDataFound = {
      data: [],
      message: 'No response found',
    };
    return {
      ...noDataFound,
    };
  }
};
