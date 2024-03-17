import { API_VERSION } from '../config';
import { ErrorInstanceType } from '../types/error';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleResponseError(err: ErrorInstanceType) {
  return {
    status: "failed",
    code: err.statusCode,
    message: err.message,
    metadata: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
    },
  };
}
