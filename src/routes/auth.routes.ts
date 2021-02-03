import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const authRoutes = Router();

authRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthUserService();

  const auth = await authUserService.execute({ email, password });

  return response.json(auth);
});

export default authRoutes;
