import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface IToken {
  iat: number;
  exp: number;
  sub: string;
}

const checkAuthentication = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Authorization token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as IToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Authorization token is invalid', 401);
  }
};

export default checkAuthentication;
