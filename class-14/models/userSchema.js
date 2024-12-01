import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import jwtAuth from '../controller/auth/jwt.auth.controller.js';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    pictureUrl: { type: String },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    bio: String,
    followers: [{ type: Schema.Types.ObjectId }],
    sex: { type: String, enum: ['male', 'female'] },
    following: [{ type: Schema.Types.ObjectId }],
    lastLogin: { type: Date },
    isVerified: { type: Boolean, default: false },
    accountStatus: {
      type: String,
      enum: ['active', 'suspended', 'deactivated'],
      default: 'active',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  let { password } = this;
  const salt = bcrypt.genSaltSync(10);

  this.password = bcrypt.hashSync(password, salt);
  next();
});

userSchema.statics.login = async function (credential, password) {
  console.log(credential);
  const user = await this.findOne({ email: credential });
  if (!user) {
    throw new Error('user not found!');
  }
  const correct = bcrypt.compareSync(password, user.password);
  if (!correct) {
    throw new Error('incorrect password');
  }

  return user;
};

const User = mongoose.model('User', userSchema);

export { User };
