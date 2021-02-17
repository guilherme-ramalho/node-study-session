import { Router } from 'express';
import appointmentRoutes from '@modules/appointment/infra/http/routes/appointments.routes';
import userRoutes from '@modules/user/infra/http/routes/users.routes';
import authRoutes from '@modules/user/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
