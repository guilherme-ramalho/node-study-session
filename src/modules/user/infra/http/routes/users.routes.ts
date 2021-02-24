import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import AuthMiddleware from '@shared/infra/http/middlewares/checkAuthentication';
import UserController from '../controllers/UserController';

const router = Router();
const upload = multer(uploadConfig);
const userController = new UserController();

router.post('/create', userController.create);

router.patch(
  '/changePicture',
  AuthMiddleware,
  upload.single('picture'),
  userController.changePicture
);

export default router;
