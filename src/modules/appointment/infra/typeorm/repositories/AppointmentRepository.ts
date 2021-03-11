import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointment/repositories/IAppointmentRespository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async findAll(): Promise<Array<Appointment>> {
    const appointments = await this.repository.find();

    return appointments;
  }

  public async create(
    appointmentDTO: ICreateAppointmentDTO
  ): Promise<Appointment> {
    const appointment = this.repository.create(appointmentDTO);
    await this.repository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.repository.findOne({
      where: {
        date,
      },
    });

    return foundAppointment;
  }
}

export default AppointmentsRepository;
