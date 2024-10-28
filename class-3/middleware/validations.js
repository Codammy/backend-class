export function validateCreateBlog(req, res, next) {
  const { title, body } = { ...req.body };

  if (!title) {
    res.status(400).send({ title: "title can't be empty" });
    return;
  } 
  if (!body) {
        res.status(400).send({ blog: "blog can't be empty" });
        return;
  }

    // !title ? res.status(400).send({ title: "title can't be empty" }) : !body ? res.status(400).send({ blog: "blog can't be empty" }): next()


  console.log(title, body);
  next();
}
