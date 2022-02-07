import axios from 'axios';

import { publicToken } from '@/constants/index';
import { getLocalStorageValues } from '@/constants/local-storage';

export const verifyUserToken = () => {
  const { user_auth_token } = getLocalStorageValues();
  if (user_auth_token) {
    axios.defaults.headers.common.Authorization = `Bearer ${user_auth_token}`;
  } else if (publicToken) {
    axios.defaults.headers.common.Authorization = `Public ${publicToken}`;
  }
};
