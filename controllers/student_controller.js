const Employee = require("../models/employee");
const Student = require("./../models/student");

module.exports.studentsList = function (req, res) {
  Student.find({}, function (err, students) {
    // console.log(students);
    if (err) {
      console.log("Error while displaying list of students", err);
      return res.redirect("back");
    }

    return res.render("students_list", {
      title: "Student List",
      students: students,
    });
  });
};

module.exports.createStudent = async function (req, res) {
  // console.log(req.body);
  try {
    let student = await Student.findOne({ name: req.body.name });
    if (student) {
      return res.redirect("back");
    }
    student = await Student.findOne({ student_id: req.body.student_id });
    if (student) {
      return res.redirect("back");
    }
    Student.create(req.body, function (err, emp) {
      if (err) {
        console.log("Error while creating student data", err);
        return res.redirect("back");
      }
      return res.redirect("/students/");
    });
  } catch (err) {
    console.log("Error while creating student data", err);
    return res.redirect("back");
  }
};

module.exports.studentInfo = function (req, res) {
  Student.findOne({ name: req.query.name }, function (err, student) {
    res.render("student_info", {
      title: "Student Info",
      student: student,
    });
  });
};
