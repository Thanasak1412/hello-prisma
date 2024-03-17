import { NextFunction, Request, Response } from 'express';

import { PATH_EXTERNAL_API } from '../routes/path';
import { Post } from '../types/post';
import axios from '../utils/axios';
import { db } from '../utils/db';
import { CustomError } from '../utils/error';
import { handleResSuccess } from '../utils/response';

const getPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get<Post[]>(PATH_EXTERNAL_API.post.getPosts);

    if (!response.data.length) {
      throw new CustomError("not found user", 404);
    }

    res.status(response.status).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to get post: ", error);

    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.post<Post>(
      PATH_EXTERNAL_API.post.createPost,
      req.body
    );

    const { id, title, body, userId } = response.data;

    if (!id) {
      throw new CustomError(`not found post id: ${id}`, 400);
    }

    await db.post.create({
      data: {
        title,
        content: body,
        authorId: userId,
        published: false,
      },
    });

    res.status(201).json(handleResSuccess(response));
  } catch (error) {
    console.error("Failed to create post with: ", JSON.stringify(req.body));

    next(error);
  }
};

export { createPost, getPosts };
