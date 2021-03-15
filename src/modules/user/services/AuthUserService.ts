import { sign } from 'jsonwebtoken';
import User from '@modules/user/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRespository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IAuth {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: User;
  token: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IAuth): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 404);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError('Invalid credentials', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthUserService;
