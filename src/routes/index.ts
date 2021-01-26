import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/user', userRoutes);

export default routes;
