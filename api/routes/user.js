const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserController = require("../controllers/user");

//for encrypted passwords i use node.bcrypt.js
router.post("/signup", UserController.user_create);

router.post("/login", UserController.user_login);

router.delete("/:userId", UserController.user_delete);

module.exports = router;
