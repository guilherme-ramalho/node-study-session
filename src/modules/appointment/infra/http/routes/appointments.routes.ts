import { Router } from 'express';
import AuthMiddleware from '@shared/infra/http/middlewares/checkAuthentication';
import AppointmentController from '../controllers/AppointmentController';

const router = Router();

const appointmentController = new AppointmentController();

router.use(AuthMiddleware);

router.get('/list', appointmentController.list);

router.post('/create', appointmentController.create);

export default router;
