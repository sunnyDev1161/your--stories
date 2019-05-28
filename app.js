const express = require("express");
const mongoose = require("mongoose");

const app = express();

// to the index page
app.get("/", (req, res) => {
  res.send("It is working");
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
