const express = require("express");

const router = express.Router();

const interviewController = require("./../controllers/interview_controller");

router.get("/", interviewController.interviewList);
router.post("/create", interviewController.createInterview);
router.get("/information/:id", interviewController.showInfo);
router.post("/update-result", interviewController.updateResult);

module.exports = router;
