import express from 'express';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/user';
import { PATH_API } from './path';

const router = express.Router();

router.get(PATH_API.user.getUsers, getUsers);

router.post(PATH_API.user.createUser, createUser);

router.patch(PATH_API.user.updateUser, updateUser);

router.delete(PATH_API.user.deleteUser, deleteUser);

export default router;
