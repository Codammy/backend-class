import { Router } from "express";
import { validateCreateBlog } from "../middleware/validations.js";
import { blogs } from '../data/blogs.js';

const blogRoute = new Router();

// get all blogs
blogRoute.get('/', (req, res) => {

  res.status(200).send(blogs);
});

// get blog by id - single
blogRoute.get(':id', (req, res) => {
  const id = req.params.id;

  // const blog = blogs.find((blog) => { 
  //   if (blog.id == id) {
  //     return blog;
  //   }
  // });

  const blog = blogs.find((blog) => blog.id == id);
  if (!blog) {
    res.status(404).send({ message: 'blog not found!' });
  }
  res.send({ data: blog });
});

// replaces blog field
blogRoute.put(':id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id == id);
  if (blog) {
    console.log('updates blog');
    res.send(req.body);
    return;
  }
  res.status(404).send({ mesage: 'Blog Not Found' });
});

// delete single blog
blogRoute.delete(':id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === Number(id));
  if (blog) {
    console.log(`Deleting blog with  id  of ${req.params.id}`);
    res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  res.status(404).send({ message: 'Blog Not Found' });
});

// updates some values
blogRoute.patch(':id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === Number(id));
  if (blog) {
    console.log(`Deleting blog with  id  of ${req.params.id}`);
    res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  res.status(404).send({ message: 'Blog Not Found' });
});

// creates a blog
blogRoute.post('/', validateCreateBlog, (req, res) => {
  res.status(200).send({ message: 'Blog added!', data: req.body });
});


export default blogRoute;