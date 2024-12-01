import jwt from 'jsonwebtoken';
import { User } from '../../models/userSchema.js';

const jwtAuth = async (req, res, next) => {
  const unprotectedRoute = [
    '/status',
    '/api/v1/users/create-account',
    '/api/v1/auth/login',
    '/api/v1/auth/forgot-password',
    '/api/v1/auth/reset-password',
  ];
  if (unprotectedRoute.find((route) => route === req.path.trim())) {
    return next();
  }
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }
  const [type, token] = auth.split(' ');
  if (type !== 'Bearer') {
    return res.status(401).send({ success: false, message: 'Unauthorized' });
  }

  try {
    const credential = jwt.verify(token, process.env.APP_SECRET);
    req.currentUser = await User.findById(credential.data.id);
  } catch (err) {
    console.log(err);
    return res.status(403).send({ success: false, message: 'Access Denied' });
  }
  return next();
};

export async function passwordResetToken(req, res) {
  const { email } = req.query;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ success: false, message: 'User not found!' });
  }
  const token = jwt.sign({ email: user.email }, process.env.APP_SECRET, {
    expiresIn: '1h',
  });

  res.send({ passwordResetToken: token, success: true });
}

export async function resetPassword(req, res) {
  const { token, password } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    const user = await User.findOne({ email: decodedToken.email });
    user.password = password;
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: true, reason: err.message });
  }
  return res.send({ success: true, message: 'password reset successful' });
}

export default jwtAuth;
