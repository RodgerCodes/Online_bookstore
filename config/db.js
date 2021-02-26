const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Successfully connected to DB");
      }
    );
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
