import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../respositories/appointments.repository';

const router = Router();
const appointmentRepository = new AppointmentsRepository();

router.get('/list', (request, response) => {
  const appointments = appointmentRepository.findAll();

  return response.json(appointments);
});

router.post('/create', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));

  if (appointmentRepository.isDateAlreadyBooked(parsedDate)) {
    return response.json({ message: 'This date is no longer available' });
  }

  const appointments = appointmentRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json({
    data: appointments,
    message: 'Appoint successfully booked',
  });
});

export default router;
