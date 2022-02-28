const Student = require("./../models/student");
const Interview = require("./../models/interview");
const Result = require("./../models/result");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const res = require("express/lib/response");

module.exports.interviewList = async function (req, res) {
  try {
    let students = await Student.find({});
    let interviews = await Interview.find({});

    return res.render("interview_list", {
      title: "Interview List",
      students: students,
      interviews: interviews,
    });
  } catch (err) {
    console.log("Error while displaying interview List.........", err);
    return res.redirect("back");
  }
};

module.exports.createInterview = async function (req, res) {
  try {
    let interview = await Interview.create({
      company: req.body.company,
      date: req.body.date,
    });

    if (typeof req.body.students == "object") {
      for (let student of req.body.students) {
        await addStudent(interview, student);
      }
    } else {
      await addStudent(interview, req.body.students);
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error while creating interview List.........", err);
    return res.redirect("back");
  }
};

module.exports.showInfo = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id).populate(
      "students"
    );
    let results = [];
    for (let student of interview.students) {
      let result = await Result.findOne({
        interview: interview.id,
        student: student.id,
      });
      // console.log("******************", result.student);
      results.push(result);
    }

    // console.log(results);
    // console.log(req.params.id);
    return res.render("interview_info", {
      title: "Interview Information",
      interview: interview,
      results: results,
    });
  } catch (err) {
    console.log("Error while displaying information of interview*******", err);
    return res.redirect("back");
  }
};

module.exports.updateResult = async function (req, res) {
  try {
    let resultId = await req.query.id;
    let resultStatus = await req.query.result;
    // console.log(resultId, " ", resultStatus);
    let result = await Result.findByIdAndUpdate(resultId, {
      result: resultStatus,
    });
    // console.log(result);
    // return res.redirect("back");
    return res.status(200).json({
      result: resultStatus,
      message: "Result Updated Successfully",
    });
  } catch (err) {
    console.log("Error while updating result", err);
    return;
  }
};

async function addStudent(interview, student) {
  try {
    let studentData = await Student.findOne({ name: student });
    await interview.students.push(studentData);
    await interview.save();
    let result = await Result.create({
      interview: interview,
      student: studentData,
    });
    // console.log("LOOP: ", result);
  } catch (err) {
    console.log("ERROR in addStudent function: ", err);
    return;
  }
}
