const Employee = require("./../models/employee");
const Interview = require("./../models/interview");
const Student = require("./../models/student");
const Result = require("./../models/result");
const ObjectsToCSV = require("objects-to-csv");
const fs = require("fs");
// const JobScrapper = require("job-scraper");

module.exports.home = function (req, res) {
  // console.log("HI", res.locals);
  // const args = ["Pizza Delivery", "New York", "New York"];
  // const jobScraper = new JobScraper(...args);
  // const scraped = jobScraper.init();
  // scraped.then((res) => {
  //   console.log(res);
  // });
  return res.render("home", {
    title: "Placement Cell",
    listOfStudent: "No list of student",
  });
};

module.exports.csvDownload = async function (req, res) {
  try {
    let csvData = [];
    let interviews = await Interview.find({});
    let count = 1;
    for (let interview of interviews) {
      // console.log("**********************", interview);
      for (let student of interview.students) {
        // console.log("**********************", student);
        let result = await Result.findOne({
          interview: interview.id,
          student: student,
        })
          .populate("interview")
          .populate("student");

        csvData.push({
          SrNo: count,
          "Student ID": result.student.student_id,
          "Student Name": result.student.name,
          "Student College": result.student.college,
          "Student Status": result.student.status,
          "DSA Final Score": result.student.DSAScore,
          "WebD Final Score": result.student.WebDScore,
          "React Final Score": result.student.ReactScore,
          "Interview Date": result.interview.date,
          "Interview Company": result.interview.company,
          "Interview Student Result": result.result,
        });
        // console.log(count);
        count++;
      }
    }
    const csvFile = new ObjectsToCSV(csvData);
    await csvFile.toDisk("./students_data.csv");
    // console.log(csvFile);
    return res.download("./students_data.csv", () => {
      fs.unlinkSync("./students_data.csv");
    });
    // return res.redirect("/");
  } catch (err) {
    console.log("Error while downloading CSV file", err);
    return res.redirect("back");
  }
};
