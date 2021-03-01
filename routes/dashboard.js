const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Uploads = require("../models/Uploads");
const User = require("../models/User");

// @desc GET request for dashboard
// @route /dashboard
router.get("/", (req, res) => {
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
        let uploads = await Uploads.find({ user_id: user }).sort({
          createdAt: "desc",
        });
        res.send(uploads);
      }
    });
  }
});

router.get("/profile", (req, res) => {
  let token = req.headers["auth-token"];

  if (!token) {
    res.send({ msg: "No token found" });
  } else {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.send(err);
      } else {
        let user = decoded;
        let profile = await User.findById(user);
        res.status(200).send(profile);
      }
    });
  }
});

// @desc DELETE REQUEST TO DELETE ACCOUNT
// @route /dashboard/profile/del
router.delete("/profile/del", (req, res) => {
  let token = req.headers["auth-token"];

  if (!token) {
    return res.send("no token");
  } else {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.send(err);
      } else {
        let user = decoded;
        await User.findByIdAndDelete(user);
        res.json({ success: true, msg: "Account deleted" });
      }
    });
  }
});

module.exports = router;
