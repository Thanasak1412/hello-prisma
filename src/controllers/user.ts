import { NextFunction, Request, Response } from 'express';

import { PATH_EXTERNAL_API } from '../routes/path';
import { User } from '../types/user';
import axios from '../utils/axios';
import { db } from '../utils/db';
import { CustomError } from '../utils/error';
import { handleResSuccess } from '../utils/response';

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get<User[]>(PATH_EXTERNAL_API.getUsers);

    if (!response.data.length) {
      throw new CustomError("not found users", 404);
    }

    res.status(response.status).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to get user: ", error);

    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.post<User>(
      PATH_EXTERNAL_API.createUser,
      req.body
    );

    if (!response.data.id) {
      throw new CustomError("not found inserted id", 400);
    }

    const { id, email, name } = response.data;

    db.user.create({
      data: { email, id, name },
    });

    res.status(201).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to create user: ", error);

    next(error);
  }
};

export { createUser, getUsers };
