import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../respositories/AppointmentRepository';

interface Appointment {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    providerId,
  }: Appointment): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const isDateAlreadyBooked = await appointmentRepository.isDateAlreadyBooked(
      appointmentDate
    );

    if (isDateAlreadyBooked) {
      throw new Error('This date is no longer available');
    }

    const appointment = appointmentRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
