import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../respositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

router.get('/list', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

router.post('/create', async (request, response) => {
  try {
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointments = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    return response.json({
      data: appointments,
      message: 'Appoint successfully booked',
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default router;
