import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/user/services/CreateUserService';
import UpdateUserAvatar from '@modules/user/services/UpdateUserAvatar';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    return response.json({
      user,
      message: 'Appointment successfully created',
    });
  }

  async changePicture(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      pictureFilename: request.file.filename,
    });

    return response.json({ user });
  }
}

export default UserController;
