import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const router = Router();

router.post('/create', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json({
      user,
      message: 'Appointment successfully created',
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default router;
