import { isEqual } from 'date-fns';
import Appointment from '../models/appointments.model';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

export default class AppointmentsReposiyory {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public findAll(): Array<Appointment> {
    return this.appointments;
  }

  public isDateAlreadyBooked(date: Date): Appointment | null {
    const dateAlreadyBooked = this.appointments.find(
      ({ date: appointmentDate }) => isEqual(date, appointmentDate)
    );

    return dateAlreadyBooked || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Array<Appointment> {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return this.appointments;
  }
}
