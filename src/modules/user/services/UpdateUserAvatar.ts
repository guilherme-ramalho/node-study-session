import path from 'path';
import fs from 'fs';
import User from '@modules/user/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRespository';

interface IAvatarUpload {
  userId: string;
  pictureFilename: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute({
    userId,
    pictureFilename,
  }: IAvatarUpload): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.picture) {
      const userPicturePath = path.join(uploadConfig.directory, user.picture);
      const userPictureExists = await fs.promises.stat(userPicturePath);

      if (userPictureExists) {
        await fs.promises.unlink(userPicturePath);
      }
    }

    user.picture = pictureFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatar;
