import { AxiosResponse } from 'axios';

import { API_VERSION } from '../config';

export function handleResSuccess<T>(response: AxiosResponse<T, any>) {
  return {
    status: "success",
    code: response.status,
    data: response.data,
    metadata: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
    },
  };
}
