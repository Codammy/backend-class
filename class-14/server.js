import express from 'express';

import { fileURLToPath } from 'url';
import morgan from 'morgan';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import jwtAuth from './controller/auth/jwt.auth.controller.js';
import blogRoute from './routes/blog.js';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';

import multer from 'multer';
import path from 'path';

configDotenv();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname, __filename);

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/public/tmp'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStorage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));

if (process.env.AUTH_TYPE === 'Basic') {
  app.use(basic_auth);
} else if (process.env.AUTH_TYPE === 'session') {
  app.use(session_auth);
} else if (process.env.AUTH_TYPE === 'Bearer') {
  app.use(jwtAuth);
}

app.post('/upload', upload.single('file'), (req, res) => {
  res.send({ sucess: true, message: 'Upload Successful' });
});

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
app.use('/api/v1/auth', authRoute);

app.use('/api/v1/blogs', blogRoute);

app.use('/api/v1/users', userRoute);


// run the code that starts the server
startServer();
