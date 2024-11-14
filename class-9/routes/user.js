import { Router } from 'express';
import { User } from '../models/userSchema.js';

const userRoute = new Router();

userRoute.get('/', async (req, res, next) => {
  const users = await User.find();
  return res.send({ data: users, success: true });
});

userRoute.get('/profile/:id', (req, res, next) => {});

userRoute.get('/profile', (req, res, next) => {});

userRoute.put('/profile', (req, res, next) => {});

userRoute.post('/create-account', async (req, res, next) => {
  const { email, firstname, lastname, password, username } = req.body;

  const user = new User({ email, firstname, lastname, password, username });

  try {
    await user.save();
  } catch (err) {
    console.log(err);

    const message =
      err.code === 11000
        ? 'email or username already exists'
        : 'check your payload!';
    return res.status(400).send({ success: false, message: message });
  }

  return res.send({ message: 'user created', success: true });
});

userRoute.delete('/:user_id', (req, res, next) => {
  const { user_id } = req.params;
  console.log(User.deleteOne({ _id: user_id }));
});

export default userRoute;
