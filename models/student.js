const mongoose = require("mongoose");

const studentShema = new mongoose.Schema(
  {
    student_id: {
      type: "String",
      required: true,
    },
    name: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    college: {
      type: "String",
      required: true,
    },
    batch: {
      type: "String",
      required: true,
    },
    status: {
      type: "String",
      required: true,
    },
    score: {
      type: "String",
      required: true,
    },
    DSAScore: {
      type: "String",
      required: true,
    },
    WebDScore: {
      type: "String",
      required: true,
    },
    ReactScore: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentShema);

module.exports = Student;
