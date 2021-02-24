import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUserRepository from '@modules/user/repositories/IUserRespository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User | undefined> {
    const user = this.userRepository.create(data);
    await this.userRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

export default UserRepository;
