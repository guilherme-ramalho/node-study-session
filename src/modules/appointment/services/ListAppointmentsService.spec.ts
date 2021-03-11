import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListAppointmentsService from './ListAppointmentsService';

describe('ListAppointmentsService', () => {
  it('should be able to list all users from database', async () => {
    const fakeApointmentRepository = new FakeAppointmentRepository();
    const listAppointmentsService = new ListAppointmentsService(
      fakeApointmentRepository
    );

    const appointments = await listAppointmentsService.execute();

    expect(appointments).toEqual([]);
  });
});
