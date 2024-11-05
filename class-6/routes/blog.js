import { Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { validateCreateBlog } from '../middleware/validations.js';

import { client } from '../server.js';

const blogRoute = new Router();

// get all blogs
blogRoute.get('/', async (req, res) => {
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');

  const blogs = await collection.find().toArray();
  res.status(200).send(blogs);
});

// get blog by id - single
blogRoute.get('/:id', async (req, res) => {
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');

  const id = req.params.id;
  const blog = await collection.findOne({ _id: new ObjectId(id) });

  if (!blog) {
    return res.status(404).send({ message: 'blog not found!' });
  }
  return res.send({ data: blog });
});

// replaces blog field
blogRoute.put('/:id', validateCreateBlog, async (req, res) => {
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');

  const id = req.params.id;
  const blog = await collection.findOneAndUpdate(
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
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');
  const id = req.params.id;
  const blog = await collection.deleteOne({ _id: new ObjectId(id) });
  if (blog.acknowledged) {
    return res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  return res.status(404).send({ message: 'Blog Not Found' });
});

// updates some values
blogRoute.patch('/:id', async (req, res) => {
  // Implement this yourself to test your ability to update a blog
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');

  const id = req.params.id;
  const blog = await collection.findOneAndUpdate(
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
  const blog_db = client.db('bafuto');
  const collection = blog_db.collection('blogs');

  let status = await collection.insertOne(req.body);

  return res.status(200).send({ message: 'Blog added!', data: status });
});

export default blogRoute;
