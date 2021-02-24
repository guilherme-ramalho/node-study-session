import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/user/services/AuthUserService';

class AuthController {
  async createSession(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const auth = await authUserService.execute({ email, password });

    return response.json(auth);
  }
}

export default AuthController;
