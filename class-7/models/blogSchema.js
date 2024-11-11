import mongoose, { mongo } from 'mongoose';

const { Schema, ObjectId } = mongoose;

const blogSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  author: { type: String },
  datePublished: { type: Date, default: Date.now },
  views: Number,
  isPublished: { type: Boolean, default: false },
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

export { Blog };
