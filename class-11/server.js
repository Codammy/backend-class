import express from 'express';

import morgan from 'morgan';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import basic_auth from './controller/basic_auth.controller.js';
import cookieParser from 'cookie-parser';

configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));

if (process.env.AUTH_TYPE === 'basic') {
  app.use(basic_auth);
} else if (process.env.AUTH_TYPE === 'session') {
  app.use((req, res, next) => {
    const unprotectedRoute = [
      '/status',
      '/api/v1/user/create-account',
      '/api/v1/user/login',
    ];
    if (unprotectedRoute.find((route) => route === req.path)) {
      return next();
    }

    let cookie = req.cookies;
    console.log(cookie);
    try {
      if (!cookie.hasOwnProperty(process.env.AUTH_TYPE)) {
        res.status(401).send({ error: 'unauthorized', success: false });
      }
    } catch (err) {
      res.status(401).send({ error: 'unauthorized', success: false });
    }
    next();
  });
  // app.use(console.log('session auth'));
}

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
app.get('/status', (req, res) => {
  console.log(req.cookies);
  res.send('alive');
});

// Routes
app.use('/api/v1/blog', blogRoute);

app.use('/api/v1/user', userRoute);

// run the code that starts the server
startServer();
