const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");


router.post("/", async function (req, res) {
  const user = new User(req.body);
  const token = await user.generateAuthToken();
  await user.save();
  res.status(200).send({ user, token });
});

router.post("/newuser", multer().single("myFile"), async function (req, res) {
  const user = new User({ ...req.body, profilepic: req.file.buffer });
  const token = await user.generateAuthToken();
  await user.save();
  console.log(user);
  res.send({ user, token });
  res.status(200);
});


module.exports = router;
