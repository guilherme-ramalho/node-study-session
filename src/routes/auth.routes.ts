import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const authRoutes = Router();

authRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({ email, password });

    return response.json(auth);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default authRoutes;
