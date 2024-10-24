import express from 'express';
import loadenv from './utils/loadenv.js';

const app = express();

async function startServer() {
  await loadenv();
  const port = process.env.PORT || 8081;
  console.log(process.env);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

startServer();
