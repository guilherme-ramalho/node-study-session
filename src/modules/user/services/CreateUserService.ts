import User from '@modules/user/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRespository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUser {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IUser): Promise<User | undefined> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const userPass = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: userPass,
    });

    return user;
  }
}

export default CreateUserService;
