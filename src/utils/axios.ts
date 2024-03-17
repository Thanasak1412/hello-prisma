import axios from 'axios';

import { EXTERNAL_BASE_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: EXTERNAL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
