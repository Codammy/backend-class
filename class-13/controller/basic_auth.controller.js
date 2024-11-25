import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';

export default async function basic_auth(req, res, next) {
  const unprotectedRoute = [
    '/status',
    '/api/v1/user/create-account',
    '/api/v1/user/login',
  ];
  if (unprotectedRoute.find((route) => route == req.path)) {
    return next();
  }

  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: 'unauthorized' });
  }
  authorization = authorization.split(' ');
  const [authType, endcodedCredentials] = [...authorization];
  if (endcodedCredentials.length === 0) {
    return res.status(401).send({ error: 'unauthorized' });
  }
  if (authType !== 'Basic') {
    return res.status(403).send({ error: 'forbidden' });
  }

  let credentials = Buffer.from(endcodedCredentials, 'base64').toString();
  const [_email, _password] = credentials.split(':');
  const user = await User.findOne({ email: _email });
  if (!user) {
    return res.status(404).send({ error: 'email not found!' });
  }
  let cond = bcrypt.compareSync(_password, user.password);
  if (!cond) {
    return res.status(401).send({ error: 'incorrect password' });
  }

  req.currentUser = user;
  next();
}
