import { Router } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/user/services/AuthUserService';

const authRoutes = Router();

authRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = container.resolve(AuthUserService);

  const auth = await authUserService.execute({ email, password });

  return response.json(auth);
});

export default authRoutes;
