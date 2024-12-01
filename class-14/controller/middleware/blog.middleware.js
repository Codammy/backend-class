import { Blog } from '../../models/blogSchema.js';
import { User } from '../../models/userSchema.js';
import { ObjectId } from 'mongodb';

export const getAllBlogs = async (req, res) => {
  let blogs = [];
  try {
    blogs = await Blog.find({});
  } catch (err) {
    return res.status(500).send(err.message);
  }
  return res.send(blogs);
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).send({ message: 'blog not found!' });
  }
  return res.send({ data: blog });
};

export const updateById = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  if (blog) {
    return res.send(blog);
  }
  return res.status(404).send({ mesage: 'Blog Not Found' });
};

export const updateBlogPartialById = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  if (blog) {
    return res.send({ message: `Updated blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
};

export const deleteById = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.deleteOne({ _id: new ObjectId(id) });
  console.log(blog);
  if (blog.acknowledged) {
    return res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
};

export const createBlog = async (req, res) => {
  const blog = new Blog({ ...req.body });
  blog.author = req.currentUser._id;
  try {
    const { _id } = await blog.save();
    console.log(req.currentUser);
  } catch (err) {
    return res.status(400).send({ message: err.message, success: false });
  }
  return res.status(200).send({ message: 'Blog added!', data: blog });
};

export async function getUserBlogs(req, res) {
  try {
    const blogs = await Blog.find({ author: req.currentUser.id })
    res.send({ data: blogs, success: true });
  } catch (err) {
    res.status(500).send({
      success: false,
      reason: 'Internal server error, will fix it shortly',
      reason: err.message,
    });
  }
}
