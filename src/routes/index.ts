import express from 'express';

import { createUser, getUsers } from '../controllers/user';
import { PATH_API } from './path';

const router = express.Router();

router.get(PATH_API.getUsers, getUsers);

router.post(PATH_API.createUser, createUser);

export default router;
