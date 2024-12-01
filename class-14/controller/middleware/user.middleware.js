import { User } from '../../models/userSchema.js';

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  return res.send({ data: users, success: true });
};

export const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return res.status(404).send({ message: 'user not found!' });
  }
  const {
    _id,
    email,
    username,
    firstname,
    lastname,
    followers,
    posts,
    bio,
    sex,
    following,
    isVerified,
    accountStatus,
  } = user;
  return res.send({
    data: {
      _id,
      email,
      username,
      firstname,
      lastname,
      followers,
      posts,
      bio,
      sex,
      following,
      isVerified,
      accountStatus,
    },
    status: 'success',
  });
};

export const registerUser = async (req, res, next) => {
  const { email, firstname, lastname, password, username } = req.body;

  const user = new User({ email, firstname, lastname, password, username });

  try {
    await user.save();
  } catch (err) {
    console.log(err.message);
    const message =
      err.code === 11000 ? 'email or username already exists' : err.message;
    return res.status(400).send({ success: false, message: message });
  }

  return res.send({ message: 'user created', success: true });
};

export const deleteUser = (req, res, next) => {
  const { user_id } = req.params;
  console.log(User.deleteOne({ _id: user_id }));
};
