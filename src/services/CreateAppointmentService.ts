import { startOfHour } from 'date-fns';
import AppointmentRepository from '../respositories/AppointmentRepository';

interface Appointment {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ date, provider }: Appointment): Array<Appointment> {
    const appointmentDate = startOfHour(date);

    if (this.appointmentRepository.isDateAlreadyBooked(appointmentDate)) {
      throw new Error('This date is no longer available');
    }

    const appointments = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointments;
  }
}

export default CreateAppointmentService;
