import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import routes from './routes';

import '@shared/infra/database/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log('Server running on http://localhost:3333 😎')
);
