import fs from 'fs';

const FILE_PATH = 'data/blogs.json';
import { v4 as uuid4 } from 'uuid';

export function findAll() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

export function findById(id) {
  let data;
  
  data = fs.readFileSync(FILE_PATH);
  data = JSON.parse(data);
  return data.find((blog) => blog.id == id);
}

export function deleteById(id) {
  // find blog by id, returns false if blog doesn't exist
  let data;
  
  data= fs.readFileSync(FILE_PATH);
  data = JSON.parse(data);
  if (!findById(id)) return false;

  // filter blog by id
  data = data.filter((blog) => blog.id != id);

  // converts to json string.
  const json_data = JSON.stringify(data);

  // store filtered data to blog.json
  fs.writeFileSync(FILE_PATH, json_data);

  // return filtered data
  return data;
}

export function create(blog) {
  const id = uuid4();
  
  let data, json_blog, newBlog;


  // reads blogs in json string
  data = fs.readFileSync(FILE_PATH);

  // converts to js object
  data = JSON.parse(data);

  // push blog to data(array of parsed blogs)
  newBlog = { id, ...blog };
  data.push(newBlog);

  // converts data to json string
  json_blog = JSON.stringify(data);

  // writes json_blog to file
  fs.writeFileSync(FILE_PATH, json_blog);

  return newBlog;
}

export function updateById(id, body) {
  let blogs, blog, json_blog
  
  blogs = findAll();
  if (!(blogs.find((blog) => blog.id == id))) return false;

  blog = { id, ...body };
  blogs = blogs.filter((blog) => blog.id != id);
  blogs.push(blog);
  // converts data to json string
  json_blog = JSON.stringify(blogs);
  // writes json_blog to file
  fs.writeFileSync(FILE_PATH, json_blog);
  return blog;
}
