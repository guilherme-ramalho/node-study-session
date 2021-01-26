import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    throw new Error('Authorization token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as IToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Authorization token is invalid');
  }
};

export default checkAuthentication;
