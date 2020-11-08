import express from 'express';

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hellow world' });
})

app.listen(3333, () => console.log('server stated on port 3333'));