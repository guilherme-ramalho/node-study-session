import path from 'path';
import fs from 'fs';
import User from '@modules/user/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUserRespository';

interface IAvatarUpload {
  userId: string;
  pictureFilename: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
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
      await this.storageProvider.deleteFile(user.picture);
    }

    user.picture = await this.storageProvider.saveFile(pictureFilename);

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatar;
