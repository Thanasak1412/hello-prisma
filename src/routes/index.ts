import express from 'express';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/user';
import { PATH_API } from './path';

const router = express.Router();

router.get(PATH_API.getUsers, getUsers);

router.post(PATH_API.createUser, createUser);

router.patch(PATH_API.updateUser, updateUser);

router.delete(PATH_API.deleteUser, deleteUser);

export default router;
