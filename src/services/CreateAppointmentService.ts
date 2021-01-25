import { isDate, startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../respositories/AppointmentRepository';

interface Appointment {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Appointment): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(date);

    const isDateAlreadyBooked = await appointmentRepository.isDateAlreadyBooked(
      appointmentDate
    );

    if (isDateAlreadyBooked) {
      throw new Error('This date is no longer available');
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
