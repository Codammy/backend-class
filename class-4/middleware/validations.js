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
