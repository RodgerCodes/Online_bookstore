const mongoose = require("mongoose");

const profile_schema = new mongoose({
  bio: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("profile", profile_schema);
