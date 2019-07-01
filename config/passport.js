const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const mongoose = require("mongoose");

//bringing the model
const User = mongoose.model("user");

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
        const newUser = {
          googleID: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        };

        User.findOne({
          googleID: profile.id
        })
          .then(user => {
            if (user) {
              //if we have already the user then return the user
              done(null, user);
            } else {
              //if user is new than add it in the database and return it
              new User(newUser).save().then(user => done(null, user));
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
