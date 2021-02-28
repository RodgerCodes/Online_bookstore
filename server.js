const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

connectDB();

app.use("/", require("./routes/user"));
app.use("/dashboard", require("./routes/dashboard"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started in ${process.env.NODE_ENV} on port ${port}`);
});
