import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface IAvatarUpload {
  userId: string;
  pictureFilename: string;
}

class UpdateUserAvatar {
  public async execute({
    userId,
    pictureFilename,
  }: IAvatarUpload): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('User does not exists');
    }

    if (user.picture) {
      const userPicturePath = path.join(uploadConfig.directory, user.picture);
      const userPictureExists = await fs.promises.stat(userPicturePath);

      if (userPictureExists) {
        await fs.promises.unlink(userPicturePath);
      }
    }

    user.picture = pictureFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatar;
