import express from 'express';

import morgan from 'morgan';
import blogRoute from './routes/blog.js';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'));

//loads env file and starts server
async function startServer() {
  const port = process.env.PORT || 8081;

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('DB Connection OK!');
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

// check server status
app.get('/', (req, res) => {
  console.log(req.cookies);
  res.send('alive');
});

// Routes
app.use('/blog', blogRoute);

// run the code that starts the server
startServer();
