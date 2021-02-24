import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import AuthMiddleware from '@shared/infra/http/middlewares/checkAuthentication';
import CreateUserService from '@modules/user/services/CreateUserService';
import UpdateUserAvatar from '@modules/user/services/UpdateUserAvatar';

const router = Router();
const upload = multer(uploadConfig);

router.post('/create', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({ name, email, password });

  return response.json({
    user,
    message: 'Appointment successfully created',
  });
});

router.patch(
  '/changePicture',
  AuthMiddleware,
  upload.single('picture'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      pictureFilename: request.file.filename,
    });

    return response.json({ user });
  }
);

export default router;
