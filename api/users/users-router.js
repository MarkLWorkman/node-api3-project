const express = require("express");

const posts = require("../posts/posts-model");
const users = require("./users-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.use("/:id", validateUserId(users));

router.get("/", (req, res) => {
  users
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500),
        json({
          message: "Error fetching posts",
        });
    });
});

router.get("/:id", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error posting user",
      });
    });
});

router.put("/:id", validateUser, (req, res) => {
  users.update(req.params.id, req.body).then((count) => {
    if (count) {
      users.getById(req.params.id).then((user) => {
        res.status(200).json(user);
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count) {
        res.status(200).json(req.user);
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting user",
      });
    });
});

router.get("/:id/posts", (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "An Error occurred trying to retrieve posts",
      });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  posts
    .insert({
      ...req.body,
      user_id: req.user.id,
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error trying to post",
      });
    });
});

module.exports = router;
