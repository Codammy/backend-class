import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    bio: String,
    followers: [{ type: Schema.Types.ObjectId }],
    sex: { type: String, enum: ['male', 'female'] },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
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

const User = mongoose.model('User', userSchema);

export { User };
