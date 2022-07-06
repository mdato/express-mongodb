const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const { notFound, handleError } = require("./middlewares");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/api", require("./routes"));

app.use(notFound);
app.use(handleError);

module.exports = app;
