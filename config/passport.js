const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(accessToken);
        // console.log(profile);
        if (profile.emails[0].verified === true) {
          console.log(profile);
          console.log("user is verified");
        }
      }
    )
  );
};
