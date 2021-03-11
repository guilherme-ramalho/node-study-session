import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should create a new appointment', async () => {
    const fakeApointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeApointmentRepository
    );

    const date = new Date();
    const providerId = '123123123';

    const appointment = await createAppointmentService.execute({
      date,
      providerId,
    });

    expect(appointment.providerId).toBe(providerId);
  });

  it('should not book two appointments for the same time', async () => {
    const fakeApointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeApointmentRepository
    );

    const date = new Date(2020, 2, 18, 11);
    const providerId = '123123123';

    await createAppointmentService.execute({
      date,
      providerId,
    });

    expect(
      createAppointmentService.execute({
        date,
        providerId,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
