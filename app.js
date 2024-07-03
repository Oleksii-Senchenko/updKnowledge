const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const appartItemsRouter = require("./routes/api/appartItem");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/booking", appartItemsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
module.exports = app;
