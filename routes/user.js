const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("Hello");
});

// @desc POST request to create new account
// @route /register
router.post("/register", async (req, res) => {
  try {
    const errors = [];
    // if (
    //   !req.body.name ||
    //   !req.body.email ||
    //   !req.body.password ||
    //   !req.body.password_confirmation
    // ) {
    //   errors.push({ msg: "Please fill in all forms" });
    // }

    // if (req.body.password != req.body.password_confirmation) {
    //   errors.push({ msg: "Make sure passwords match" });
    // }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const new_user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });

    const user = await new_user.save();
    res.json({ success: true, msg: user });
  } catch (err) {
    {
    }
    console.error(err);
  }
});

module.exports = router;
