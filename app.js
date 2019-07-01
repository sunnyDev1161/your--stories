const express = require("express");
const expressHandlebars = require("express-handlebars");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Load user model

require("./modals/user");

// connect mongoDB
mongoose
  .connect(keys.mongoDbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("mongo db is connect"))
  .catch(err => console.log(err));

const app = express();

// handlebars middleware

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//passport config
require("./config/passport")(passport);
// Load routes
const index = require("./routes/index");
const auth = require("./routes/auth");
const stories = require("./routes/stories");

//cookie-parser
app.use(cookieParser());
//express-session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

//setting global variable
app.use((req, res, next) => {
  console.log("request1", req.user);
  res.locals.user = req.user || null;

  next();
});

//user routes
app.use("/", index);
app.use("/auth", auth);
app.use("/stories", stories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
