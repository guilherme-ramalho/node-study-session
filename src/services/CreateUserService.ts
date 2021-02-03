import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

import AppError from '../errors/AppError';

interface IUser {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = userRepository.create({
      name,
      email,
      password,
    });

    user.password = await hash(password, 8);

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
