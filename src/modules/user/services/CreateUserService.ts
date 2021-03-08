import { hash } from 'bcryptjs';
import User from '@modules/user/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRespository';

interface IUser {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
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

    const userPass = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: userPass,
    });

    return user;
  }
}

export default CreateUserService;
