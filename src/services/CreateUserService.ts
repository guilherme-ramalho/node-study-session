import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

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
      throw new Error('User already exists');
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
