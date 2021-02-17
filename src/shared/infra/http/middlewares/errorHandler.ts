import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

const errorHandler = (
  error: AppError,
  request: Request,
  response: Response,
  _: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      meta: {
        status: 'error',
        message: error.message,
      },
    });
  }

  return response.status(500).json({
    meta: {
      status: 'error',
      message: 'Internal server error',
    },
  });
};

export default errorHandler;
