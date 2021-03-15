import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to update user avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Guilherme Ramalho',
      email: 'guilherme.ramalho@outlook.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user?.id || '',
      pictureFilename: 'avatar.png',
    });

    expect(user?.picture).toBe('avatar.png');
  });

  it('should throw an error on updating a non existing user avatar', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatarService.execute({
        userId: 'wrong id',
        pictureFilename: 'avatar.png',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the older user avatar when a new one is uploaded', async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Guilherme Ramalho',
      email: 'guilherme.ramalho@outlook.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      userId: user?.id || '',
      pictureFilename: 'avatar.png',
    });

    await updateUserAvatarService.execute({
      userId: user?.id || '',
      pictureFilename: 'avatar2.png',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.png');
    expect(user?.picture).toBe('avatar2.png');
  });
});
