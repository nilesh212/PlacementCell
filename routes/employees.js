const express = require("express");
const router = express.Router();

const employeeController = require("./../controllers/employee_controller.js");
const passport = require("passport");

router.get("/sign-in", employeeController.signIn);
router.get("/sign-up", employeeController.signUp);

router.post("/create-employee", employeeController.createEmployee);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureMessage: true,
    failWithError: true,
    failureRedirect: "/employees/sign-in",
  }),
  employeeController.createSession
);

router.get("/sign-out", employeeController.destroySession);

module.exports = router;
