const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Uploads = require("../models/Uploads");

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

module.exports = router;
