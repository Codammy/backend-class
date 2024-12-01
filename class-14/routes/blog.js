import { Router } from 'express';

import { validateCreateBlog } from '../controller/middleware/validations.middleware.js';
import {
  createBlog,
  deleteById,
  getAllBlogs,
  getById,
  updateBlogPartialById,
  updateById,
} from '../controller/middleware/blog.middleware.js';

const blogRoute = new Router();

// get all blogs
blogRoute.get('/', getAllBlogs);

// get blog by id - single
blogRoute.get('/:id', getById);

// replaces blog field
blogRoute.put('/:id', validateCreateBlog, updateById);

// delete single blog
blogRoute.delete('/:id', deleteById);

// updates some values
blogRoute.patch('/:id', updateBlogPartialById);

// creates a blog
blogRoute.post('/', validateCreateBlog, createBlog);

export default blogRoute;
