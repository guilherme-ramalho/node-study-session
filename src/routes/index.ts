import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
