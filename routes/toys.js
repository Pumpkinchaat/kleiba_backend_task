const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Toy = require("../models/toy");
const {
  authorizeUser,
  getAll,
  getOne,
  deleteOne,
} = require("../controllers/handlerFactory");
const {
  createToy,
  checkAdmin,
  modifyToy,
} = require("../controllers/toys/index");

router
  .route("/")
  .get(authorizeUser(User), getAll(Toy))
  .post(authorizeUser(User), createToy);

router
  .route("/:id")
  .get(authorizeUser(User), getOne(Toy))
  .put(authorizeUser(User), checkAdmin, modifyToy)
  .delete(authorizeUser(User), checkAdmin, deleteOne(Toy));

module.exports = router;
