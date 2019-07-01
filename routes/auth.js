const express = require("express");
const routers = express.Router();
const passport = require("passport");
routers.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

routers.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    //if authentecation successful than
    res.redirect("/dashboard");
  }
);

routers.get("/verify", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("NOT AUTHENTICATED");
  }
});

routers.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = routers;
