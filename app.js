const express = require("express");
const passport = require("passport");

const app = express();

//passport config
require("./config/passport")(passport);
// Load routes
const auth = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Index");
});

//user routes

app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
