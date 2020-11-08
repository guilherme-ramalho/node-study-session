import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.listen(3333, () => console.log('server stated on port 3333'));
