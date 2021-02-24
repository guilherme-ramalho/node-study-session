import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';

import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentRespository';

interface IAppointment {
  providerId: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    date,
    providerId,
  }: IAppointment): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const isDateAlreadyBooked = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (isDateAlreadyBooked) {
      throw new AppError('This date is no longer available');
    }

    const appointment = await this.appointmentRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
