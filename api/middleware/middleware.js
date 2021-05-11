function logger(req, res, next) {
  console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`);
  next();
}

const validateUserId = (users) => (req, res, next) => {
  const id = req.params.id;
  if (id) {
    users
      .getById(id)
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
};

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
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: "missing post data",
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    req.body.user_id = req.user.id;
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
