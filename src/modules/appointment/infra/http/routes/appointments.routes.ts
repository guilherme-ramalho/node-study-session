import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointment/services/CreateAppointmentService';
import AuthMiddleware from '@shared/infra/http/middlewares/checkAuthentication';

const router = Router();

router.use(AuthMiddleware);

// router.get('/list', async (request, response) => {
//   const appointmentRepository = new AppointmentRepository();

//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

router.post('/create', async (request, response) => {
  const { providerId, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointments = await createAppointmentService.execute({
    providerId,
    date: parsedDate,
  });

  return response.json({
    data: appointments,
    message: 'Appoint successfully booked',
  });
});

export default router;
