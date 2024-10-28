import express from 'express';
import loadenv from './utils/loadenv.js';

import morgan from 'morgan';
import { validateBlog } from './middleware/validations.js';
import { userRoute } from './routes/users.js';

const app = express();

app.use(express.json());

// custom logger middleware

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// static blogs resource
const blogs = [
  {
    id: 1,
    title: 'The Rise of AI in Healthcare',
    body: 'Artificial Intelligence is revolutionizing the healthcare industry with its ability to predict diseases and improve patient care.',
    owner_id: 5,
    ratings: 5,
  },
  {
    id: 2,
    title: 'Exploring the Future of Electric Vehicles',
    body: 'As electric vehicles become more affordable, the future of transportation looks cleaner and greener.',
    owner_id: 8,
    ratings: 4,
  },
  {
    id: 3,
    title: 'The Impact of Remote Work on Productivity',
    body: 'Remote work has changed the way companies operate, with mixed results on productivity and work-life balance.',
    owner_id: 12,
    ratings: 3,
  },
  {
    id: 4,
    title: 'Blockchain: Beyond Cryptocurrency',
    body: 'While most people associate blockchain with Bitcoin, its applications extend far beyond cryptocurrency, impacting industries from supply chains to security.',
    owner_id: 6,
    ratings: 4,
  },
  {
    id: 5,
    title: 'Sustainable Living in Urban Areas',
    body: 'Cities are adopting sustainable practices like urban farming and green buildings to combat climate change and improve quality of life.',
    owner_id: 9,
    ratings: 5,
  },
];

// setting morgan logger midleware

// app.use(morgan('dev'));
// app.use(morgan('tiny'));
app.use(morgan('combined'));

//loads env file and starts server
const startServer = async () => {
  //loads environmental vriable to os.
  await loadenv();

  const port = process.env.PORT || 8081;

  // sets  app port to - port
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

// Routes

// check server status
app.get('/', (req, res) => {
  res.send('alive');
});

// get all blogs
app.get('/blog', (req, res) => {
  const owner = {
    id: 3,
    name: 'Dami',
  };

  res.status(200).send(blogs);
});

// get blog by id - single
app.get('/blog/:id', (req, res) => {
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
app.put('/blog/:id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id == id);
  if (blog) {
    console.log('updates blog');
    res.send(req.body);
    return;
  }
  res.status(404).send({ mesage: 'Blog Not Found' });
});

// delette single blog
app.delete('/blog/:id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === Number(id));
  if (blog) {
    console.log(`Deleting blog with  id  of ${req.params.id}`);
    res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  res.status(404).send({ message: 'Blog Not Found' });
});

// updates some values
app.patch('/blog/:id', (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === Number(id));
  if (blog) {
    console.log(`Deleting blog with  id  of ${req.params.id}`);
    res.send({ message: `Deleted blog with  id  of ${req.params.id}` });
  }
  res.status(404).send({ message: 'Blog Not Found' });
});

// creates a blog
app.post('/blog', validateBlog, (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Fields mising' });
    return;
  }
  console.log(req)
  res.status(200).send({ message: 'Blog added!', data: req.body });
});
// run the code that starts the server
startServer();
