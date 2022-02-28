const express = require("express");
const app = express();
require("./config/view_helpers")(app);
const port = process.env.port || 8000;

const env = require("./config/environment");
const logger = require("morgan");
const ejs = require("ejs");
const db = require("./config/mongoose");
const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const req = require("express/lib/request");
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(env.asset_path));
app.use(logger(env.morgan.mode, env.morgan.options));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// app.use(authenticateUser.setAuthenticatedUser);
// console.log(env);
app.use(
  session({
    name: "placementcell",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: mongoStore.create({
      mongoUrl: `mongodb://localhost/${env.db}`,
      autoRemove: "disabled",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while running server", err);
  }

  console.log("Server is running on port: ", port);
});

module.exports = app;
