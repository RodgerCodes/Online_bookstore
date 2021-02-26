const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "Regular",
    enum: ["Regular", "Writter"],
  },
});

module.exports = mongoose.model("user", user_schema);
