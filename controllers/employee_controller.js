const Employee = require("./../models/employee");

module.exports.signIn = function (req, res) {
  return res.render("sign_in", {
    title: "Sign In",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.createEmployee = async function (req, res) {
  try {
    let empWithId = await Employee.findOne({ emp_id: req.body.emp_id });
    let empWithName = await Employee.findOne({ name: req.body.emp_name });
    let empWithEmail = await Employee.findOne({ email: req.body.emp_email });
    if (
      !empWithId &&
      !empWithName &&
      !empWithEmail &&
      req.body.pass == req.body.confirmPass
    ) {
      Employee.create({
        emp_id: req.body.emp_id,
        name: req.body.emp_name,
        email: req.body.emp_email,
        password: req.body.pass,
      });
      return res.redirect("/employees/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error while creating employee", err);
    return res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  // Employee.findOne({ emp_id: req.body.emp_id }, function (err, emp) {
  //   if (err) {
  //     console.log("Error while creating Session", err);
  //     return res.redirect("back");
  //   }
  //   if (!emp) {
  //     return res.redirect("back");
  //   } else {
  //     if (req.body.password == emp.password) {
  //       // console.log(emp.id);
  //       res.cookie("emp_id", emp.id);
  //       return res.redirect("/");
  //     } else {
  //       return res.redirect("back");
  //     }
  //   }
  // });
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  if (req.isAuthenticated()) {
    req.logout();
  }
  return res.redirect("/");
};
