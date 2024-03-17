import { NextFunction, Request, Response } from 'express';

import { API_VERSION } from '../config';
import { PATH_API } from '../routes/path';
import axios from '../utils/axios';
import { CustomError } from '../utils/error';

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get(PATH_API.getUsers);

    if (!response.data.length) {
      throw new CustomError("not found users", 404);
    }

    res.status(response.status).json({
      status: "success",
      code: response.status,
      data: response.data,
      metadata: {
        timestamp: new Date().toISOString(),
        version: API_VERSION,
      },
    });
  } catch (error) {
    console.error("Failed to get user: ", error);
    next(error);
  }
};

export { getUsers };
