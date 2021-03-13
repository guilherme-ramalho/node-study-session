import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import AuthUserService from './AuthUserService';

describe('AuthUserService', () => {
  it('should be able authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const authUserService = new AuthUserService(fakeUserRepository);

    const response = await authUserService.execute({
      email: 'guilherme.ramalho@outlook.com',
      password: '123456',
    });

    expect(response).toHaveProperty('id');
  });
});
