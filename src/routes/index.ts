import express from 'express';

import { getUsers } from '../controllers/user';
import { PATH_API } from './path';

const router = express.Router();

router.get(PATH_API.getUsers, getUsers);

export default router;
