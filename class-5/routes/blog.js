import { Router } from 'express';
import { validateCreateBlog } from '../middleware/validations.js';
import {
  create,
  deleteById,
  findAll,
  findById,
  updateById,
} from '../file_storage/fileStorage.js';

const blogRoute = new Router();

// get all blogs
blogRoute.get('/', (req, res) => {
  const blogs = findAll();
  res.status(200).send(blogs);
});

// get blog by id - single
blogRoute.get('/:id', (req, res) => {
  const id = req.params.id;
  const blog = findById(id);
  if (!blog) {
    return res.status(404).send({ message: 'blog not found!' });
  }
  return res.send({ data: blog });
});

// replaces blog field
blogRoute.put('/:id', validateCreateBlog, (req, res) => {
  const id = req.params.id;
  const blog = updateById(id, req.body);
  if (blog) {
    return res.send(blog);
  }
  return res.status(404).send({ mesage: 'Blog Not Found' });
});

// delete single blog
blogRoute.delete('/:id', (req, res) => {
  const id = req.params.id;
  const blog = deleteById(id);
  if (blog) {
    return res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
});

// updates some values
blogRoute.patch('/:id', (req, res) => {

  // Implement this yourself to test your ability to update a blog
  const id = req.params.id;
  const blog = findById(id);
  if (blog) {
    return res.send({ message: `Updated blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
});

// creates a blog
blogRoute.post('/', validateCreateBlog, (req, res) => {
  const blog = create(req.body);

  return res.status(200).send({ message: 'Blog added!', data: blog });
});

export default blogRoute;
