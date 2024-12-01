import { User } from '../../models/userSchema.js';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const tokenValidFor = 60 * 30; // 30 mins
  const secret = process.env.APP_SECRET;
  let user;
  try {
    user = await User.login(req.body.email, req.body.password);
  } catch (err) {
    console.error(err);
    return res.status(401).send({ success: false, message: err.message });
  }

  const { _id, _email, username, accountStatus, isVerified } = user;
  const token = jwt.sign(
    {
      data: { id: _id, email: _email, username: username },
    },
    secret,
    { expiresIn: tokenValidFor }
  );
  res.header({ Authorization: token });
  res.send({ _id, _email, username, accountStatus, isVerified, token });
}
