import { User } from '../../models/userSchema.js';
import { Blog } from '../../models/blogSchema.js';

export const getCurrentUser = (req, res, next) => {
  const user = req.currentUser;
  if (!user) {
    return res.status(403).send({ message: 'Access Denied' });
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

export const updateAccount = async (req, res, next) => {
  let user = req.currentUser;
  if (!user) {
    profile;
    return res.status(403).send({ messageprofile: 'Access Denied!' });
  }
  try {
    console.log({ ...req.body });
    user = await User.findOneAndUpdate({ _id: user._id }, { ...req.body });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error, We'll fix it shortly.",
      status: 'false',
    });
  }

  return res.send({ status: 'success' });
};
