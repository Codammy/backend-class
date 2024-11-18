import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { Blog } from '../models/blogSchema.js';
import { validateCreateBlog } from '../middleware/validations.js';

const blogRoute = new Router();

// get all blogs
blogRoute.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).send(blogs);
});

// get blog by id - single
blogRoute.get('/:id', async (req, res) => {

  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).send({ message: 'blog not found!' });
  }
  return res.send({ data: blog });
});

// replaces blog field
blogRoute.put('/:id', validateCreateBlog, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  if (blog) {
    return res.send(blog);
  }
  return res.status(404).send({ mesage: 'Blog Not Found' });
});

// delete single blog
blogRoute.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.deleteOne({ _id: new ObjectId(id) });
  console.log(blog)
  if (blog.acknowledged) {
    return res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
});

// updates some values
blogRoute.patch('/:id', async (req, res) => {

  const id = req.params.id;
  const blog = await Blog.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  if (blog) {
    return res.send({ message: `Updated blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
});

// creates a blog
blogRoute.post('/', validateCreateBlog, async (req, res) => {

  // let status = await Blog.insertOne(req.body);
  const blog = new Blog(req.body)

  blog.save()

  return res.status(200).send({ message: 'Blog added!', data: blog });
});

export default blogRoute;
