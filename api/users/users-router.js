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

router.put("/:id", validateUser, (req, res) => {});

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
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
