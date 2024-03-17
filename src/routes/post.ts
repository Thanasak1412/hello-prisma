import express from 'express';

import { createPost, getPosts } from '../controllers/post';
import { PATH_API } from './path';

const router = express.Router();

router.get(PATH_API.post.getPosts, getPosts);

router.post(PATH_API.post.createPost, createPost);

export default router;
