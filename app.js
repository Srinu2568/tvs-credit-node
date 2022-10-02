const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
var proxy = require("http-proxy-middleware");
const { fileUpload } = require("./configs/cloudinary");

const { BigPromise } = require("./utils/BigPromise.js");
const homeRoutes = require("./routes/homeRoutes.js");
const ucdFormRoutes = require("./routes/ucdFormRoutes");
const evaluatorRoutes = require("./routes/evaluatorRoutes");

// db things here
const UserModel = require("./models/User.js");
const CarModel = require("./models/carModel");
const location = require("./models/location");
const UsedCar = require("./models/UsedCar");
const LabelledUsedCar = require("./models/LabelledUsedCar");

UsedCar.hasOne(LabelledUsedCar, {
  foreignKey: "usedCarId",
  onDelete: "SET NULL",
  onUpdate: "NO ACTION",
});

const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./middlewares/error-handler-middlewares.js");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("./public/build"));
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.use(bodyParser.json({ limit: "200mb" }));

// root route to deliver the react bundle

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "./public/build/index.html"));
});

// routes here
app.use("/api/v1/auth", homeRoutes);
app.use("/api/v1/ucd-form", ucdFormRoutes);
app.use("/api/v1/evaluator", evaluatorRoutes);

app.get("*", (req, res) => {
  // console.log(path.resolve(__dirname, "./public/index.html"));
  res.sendFile(path.resolve(__dirname, "./public/build/index.html"));
});

// error handler middlewares
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = app;
