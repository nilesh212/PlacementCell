const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    emp_id: {
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
    password: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
