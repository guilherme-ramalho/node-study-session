import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointment/services/CreateAppointmentService';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import ListAppointmentsService from '@modules/appointment/services/ListAppointmentsService';

class AppointmentController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listAppointmentsService = container.resolve(ListAppointmentsService);

    const appointments = await listAppointmentsService.execute();

    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const appointments = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    return response.json({
      data: appointments,
      message: 'Appoint successfully booked',
    });
  }
}

export default AppointmentController;
