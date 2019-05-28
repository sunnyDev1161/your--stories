const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

// now using google passport startegy

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.clientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
      }
    )
  );
};
