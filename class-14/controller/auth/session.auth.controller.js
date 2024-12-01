import { User } from '../../models/userSchema.js';

export default async function session_auth(req, res, next) {
  const unprotectedRoute = [
    '/status',
    '/api/v1/users/create-account',
    '/api/v1/users/login',
  ];
  if (unprotectedRoute.find((route) => route === req.path.trim())) {
    return next();
  }

  let cookie = req.cookies;
  try {
    if (
      !cookie.hasOwnProperty(process.env.SESSION_NAME) ||
      cookie.expiry < Date.now()
    ) {
      return res.status(401).send({ error: 'unauthorized', success: false });
    }
  } catch (err) {
    return res.status(401).send({ error: 'unauthorized', success: false });
  }
  const user_id = cookie[process.env.SESSION_NAME];
  const user = await User.findById(user_id);
  if (user) {
    req.currentUser = user;
    return next();
  }
  return res.status(403).send({ error: 'forbidden', success: false });
}

export async function sessionLogin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email });
  if (user) {
    let passwordStatus = bcrypt.compareSync(password, user.password);
    if (passwordStatus) {
      // let session_id = v4()
      let cookieTimeout = 60 * 0.5 * 1000;
      res.cookie(process.env.SESSION_NAME, user.id, { maxAge: cookieTimeout });
      return res.send({ message: 'login successful', success: true });
    }
  }
}

export const clearCookie = (req, res) => {
  res.clearCookie(process.env.SESSION_NAME);
  res.send({ success: true });
};
