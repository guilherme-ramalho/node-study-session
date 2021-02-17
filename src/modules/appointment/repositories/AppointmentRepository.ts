import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async isDateAlreadyBooked(date: Date): Promise<Appointment | false> {
    const foundAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return foundAppointment || false;
  }
}

export default AppointmentsRepository;
