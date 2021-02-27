const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");

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

// @desc POST request to login
// @route /login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error from the server");
    if (!user) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    let passwordisValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordisValid) {
      return res.status(401).send({ success: false, msg: "Password incorect" });
    } else {
      let token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res
        .header("auth-token", token)
        .status(200)
        .send({ success: true, token: token });
    }
  });
});

router.get("/me", (req, res, next) => {
  // console.log(req.headers["auth-token"]);
  let token = req.headers["auth-token"];

  if (!token) {
    return res.send({ msg: "NO token found" });
  } else {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.send(err);
      } else {
        let user = decoded;
        // res.send(decoded);
        let log = await User.findById(decoded);
        res.send(log);
      }
    });
  }
});

// @desc Post request to logout
// @route /logout
router.get("/logout", (req, res) => {
  let token = req.headers["auth-token"];
  if (!token) {
    res.send("No token");
  } else {
    delete req.headers["auth-token"];
  }
});

module.exports = router;
