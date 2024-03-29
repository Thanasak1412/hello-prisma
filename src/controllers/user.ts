import { NextFunction, Request, Response } from 'express';

import { PATH_EXTERNAL_API } from '../routes/path';
import { UpdateUser, User } from '../types/user';
import axios from '../utils/axios';
import { db } from '../utils/db';
import { CustomError } from '../utils/error';
import { handleResSuccess } from '../utils/response';

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get<User[]>(PATH_EXTERNAL_API.user.getUsers);

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
      PATH_EXTERNAL_API.user.createUser,
      req.body
    );

    if (!response.data.id) {
      throw new CustomError("not found inserted id", 400);
    }

    const { email, name } = response.data;

    await db.user.create({
      data: { email, name },
    });

    res.status(201).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to create user: ", error);

    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email } = req.body as UpdateUser;

  try {
    const response = await axios.patch<User>(
      PATH_EXTERNAL_API.user.updateUser(id),
      req.body
    );

    if (!response.data) {
      throw new CustomError(`not found user with id: ${id}`, 404);
    }

    await db.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
      },
    });

    res.status(200).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to update user: ", error);

    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const response = await axios.delete(PATH_EXTERNAL_API.user.deleteUser(id));

    if (typeof response.data !== "object") {
      throw new CustomError(`Can't delete user with id: ${id}`, 400);
    }

    await db.user.delete({
      where: { id: Number(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Failed to delete user: ", error);

    next(error);
  }
};

export { createUser, deleteUser, getUsers, updateUser };
