import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentRespository';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute(): Promise<Appointment[] | undefined> {
    const users = this.appointmentRepository.findAll();

    return users;
  }
}

export default ListAppointmentsService;
