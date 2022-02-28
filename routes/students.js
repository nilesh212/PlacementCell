const express = require("express");

const router = express.Router();

const studentController = require("./../controllers/student_controller");

router.get("/", studentController.studentsList);
router.post("/create", studentController.createStudent);
router.get("/information", studentController.studentInfo);

module.exports = router;
