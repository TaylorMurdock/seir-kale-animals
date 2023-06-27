// import dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/", (req, res) => {
  //shows hello world on PORT when running
  res.send("hello world");
});

// listener
app.listen(process.env.PORT, () =>
  console.log(`listening to port ${process.env.PORT}`)
);
