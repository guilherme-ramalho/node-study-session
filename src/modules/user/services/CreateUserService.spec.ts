import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import { v4 as uuid } from 'uuid';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const userData = new User();
    userData.id = uuid();
    userData.name = 'Guilherme Ramalho';
    userData.email = 'guilherme.ramalho@outlook.com';
    userData.password = '1234';

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty('id');
  });
});

describe('CreateUserService', () => {
  it('should not be able create with an already used email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    const userData = new User();
    userData.name = 'Guilherme Ramalho';
    userData.email = 'guilherme.ramalho@outlook.com';
    userData.password = '1234';

    await createUserService.execute(userData);

    expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
