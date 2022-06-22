const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./api/routes/user");
const tripsRoutes = require("./api/routes/trips");

mongoose.connect(
  "mongodb+srv://pierbin24:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shpp.nlxv2.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/trips", tripsRoutes);

app.use((req, red, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500 || 400);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
