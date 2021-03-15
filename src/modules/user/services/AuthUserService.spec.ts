import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthUserService from './AuthUserService';
import CreateUserService from './CreateUserService';

describe('AuthUserService', () => {
  it('should be able authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUserService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      email: 'guilherme.ramalho@outlook.com',
      name: 'Guilherme Ramalho',
      password: '123456',
    });

    const response = await authUserService.execute({
      email: 'guilherme.ramalho@outlook.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not athenticate user with wrong credentials', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUserService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      email: 'guilherme.ramalho@outlook.com',
      name: 'Guilherme Ramalho',
      password: '123456',
    });

    expect(
      authUserService.execute({
        email: 'guilherme.ramalho@outlook.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not athenticate non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUserService = new AuthUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authUserService.execute({
        email: 'guilherme.ramalho@outlook.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
