// here we are creating auth routes
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// now importing Router from express
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

//now exporting the router
module.exports = router;
