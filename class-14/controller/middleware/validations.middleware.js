export function validateCreateBlog(req, res, next) {
  const { title, body } = { ...req.body };

  if (!title) {
    return res.status(400).send({ title: "title can't be empty" });
  }
  if (!body) {
    return res.status(400).send({ blog: "body of blog can't be empty" });
  }
  next();
}

export function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ error: 'email is required', success: false });
  }
  if (!password) {
    res.status(400).send({ error: 'password is required', success: false });
  }
  next();
}
