// console.log ('hello world lets get this going');

// creating our server connection with express
require("dotenv").config();

const express = require("express");
const handle = require("./handlers/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const db = require("./models");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", routes.auth);
app.use("/api/polls", routes.poll);

// // create error 404 page if requested page by user is not available
// app.use(handle.notFound);
// // final end point if the 404 error is not displayed
// app.use(handle.error);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(handle.error);

app.listen(port, console.log(`Server started on port ${port}`));
