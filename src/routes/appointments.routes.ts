import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../respositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();
const appointmentRepository = new AppointmentRepository();

router.get('/list', (request, response) => {
  const appointments = appointmentRepository.findAll();

  return response.json(appointments);
});

router.post('/create', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository
    );

    const appointments = createAppointmentService.execute({
      provider,
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
