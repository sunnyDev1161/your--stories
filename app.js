const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

// loading router
const authRouter = require("./routes/auth");

// passport config
require("./config/passport")(passport);
// to the index page
app.get("/", (req, res) => {
  res.send("It is working");
});

//loading passport-google
app.use("/auth", authRouter);
// using router
app.use("/auth", authRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
