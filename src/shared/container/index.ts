import { container } from 'tsyringe';

import '@modules/user/providers';
import './providers';

import IAppointmentRepository from '@modules/appointment/repositories/IAppointmentRespository';
import AppointmentRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentRepository';

import IUserRepository from '@modules/user/repositories/IUserRespository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
