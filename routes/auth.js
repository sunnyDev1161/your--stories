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
  passport.authenticate("google", { failureRedirect: "/" }, (req, res) => {
    //if authentecation successful than
    res.redirect("/dashboard");
  })
);

module.exports = routers;
