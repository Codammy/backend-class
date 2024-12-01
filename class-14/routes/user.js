import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getOneUser,
  registerUser,
} from '../controller/middleware/user.middleware.js';
import {
  getCurrentUser,
  updateAccount,
} from '../controller/auth/user.auth.controller.js';
import { getUserBlogs } from '../controller/middleware/blog.middleware.js';

const userRoute = new Router();

// get all users
userRoute.get('/', getAllUsers);

// get a user profile
userRoute.get('/profile/:id', getOneUser);

// get logged in user profile
userRoute.get('/profile', getCurrentUser);

// user blogs
userRoute.get('/blogs', getUserBlogs);

// update user profile
userRoute.put('/profile', updateAccount);

// register user
userRoute.post('/create-account', registerUser);

// delete a user
userRoute.delete('/:user_id', deleteUser);

export default userRoute;
