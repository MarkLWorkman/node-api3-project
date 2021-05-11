function logger(req, res, next) {
  console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`);
  next();
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  if (id) {
    Users.getById(id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "user not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something happened",
        });
      });
  } else {
    next();
  }
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: "user not found",
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
