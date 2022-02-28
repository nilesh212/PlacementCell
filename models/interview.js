const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: "String",
      required: true,
    },
    date: {
      type: "String",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
