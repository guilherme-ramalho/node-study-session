import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRespository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  public async execute(): Promise<User[] | undefined> {
    const users = this.userRepository.findAll();

    return users;
  }
}

export default ListAppointmentsService;
