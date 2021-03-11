import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';
import IAppointmentRepository from '../IAppointmentRespository';

class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async create({
    date,
    providerId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.id = uuid();
    appointment.date = date;
    appointment.providerId = providerId;

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return foundAppointment;
  }
}

export default FakeAppointmentRepository;
