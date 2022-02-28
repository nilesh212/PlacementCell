const passport = require("passport");
const LocalStrategy = require("passport-local");

const Employee = require("./../models/employee");

passport.use(
  new LocalStrategy(
    {
      usernameField: "emp_id",
    },
    function (emp_id, password, done) {
      // console.log("HI", emp_id);
      Employee.findOne({ emp_id: emp_id }, function (err, emp) {
        if (err) {
          console.log("Error while authenticating emp using LocalStrategy..");
          return done(err);
        }
        // console.log("EMP: ", emp);
        // console.log("empPassword: ", emp.password);
        // console.log("password: ", password);
        if (!emp || emp.password != password) {
          return done(null, false);
        }

        return done(null, emp);
      });
    }
  )
);

passport.serializeUser(function (emp, done) {
  // console.log("serialize");
  return done(null, emp.id);
});

passport.deserializeUser(function (emp_id, done) {
  // console.log("deserialize");
  Employee.findById(emp_id, function (err, emp) {
    if (err) {
      console.log("Error while deserializing emp", err);
      return done(err);
    }
    return done(null, emp);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/employees/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user this is coming from passport-passport_local_strategy
    res.locals.emp = req.user;
  }

  next();
};

module.exports = passport;
