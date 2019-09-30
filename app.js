const express = require("express");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Load  models
require("./modals/user");
require("./modals/story");

// connect mongoDB
mongoose
  .connect(keys.mongoDbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("mongo db is connect"))
  .catch(err => console.log(err));

const app = express();

// import hbs
const { truncate, stripTags, formatDate } = require("./helpers/hbs");
// lbody-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handlebars middleware
app.engine(
  "handlebars",
  expressHandlebars({
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate
    },
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

// path

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
