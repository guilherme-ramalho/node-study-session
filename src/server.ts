import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response) => {
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
});

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log('Server running on http://localhost:3333 😎')
);
