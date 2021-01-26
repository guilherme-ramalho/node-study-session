import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import AuthMiddleware from '../middlewares/checkAuthentication';
import CreateUserService from '../services/CreateUserService';

const router = Router();
const upload = multer(uploadConfig);

router.post('/create', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json({
      user,
      message: 'Appointment successfully created',
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

router.patch(
  '/changePicture',
  AuthMiddleware,
  upload.single('picture'),
  async (request, response) => {
    try {
      const { picture } = request.body;

      return response.json({ teste: picture });
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
);

export default router;
