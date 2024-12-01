import { Router } from 'express';
import { clearCookie } from '../controller/auth/session.auth.controller.js';
import { validateLogin } from '../controller/middleware/validations.middleware.js';
import { login } from '../controller/middleware/login.middleware.js';
import {
  passwordResetToken,
  resetPassword,
} from '../controller/auth/jwt.auth.controller.js';

const authRoute = Router();

authRoute.post('/login', validateLogin, login);

authRoute.get('/forgot-password', passwordResetToken);

authRoute.put('/reset-password', resetPassword);

authRoute.delete('/clear-cookie', clearCookie);

export default authRoute;
