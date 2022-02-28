const express = require("express");
const router = express.Router();

const homeController = require("./../controllers/home_controller.js");
const passport = require("passport");

router.get("/", homeController.home);

router.use("/employees", require("./employees"));
router.use("/students", require("./students"));
router.use("/interviews", require("./interviews"));
router.get("/download-csv", homeController.csvDownload);
module.exports = router;
