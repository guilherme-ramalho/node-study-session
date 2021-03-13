import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import { v4 as uuidv4 } from 'uuid';
import IUserRepository from '../IUserRespository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[] | undefined> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User();
    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(
      (currentUser) => currentUser.id === user.id
    );

    this.users[foundIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
