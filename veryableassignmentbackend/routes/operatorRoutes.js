const express = require("express");
const router = express.Router();
const {
  createOperator,
  getOperatorByIdParam,
  getScheduleForOperator,
} = require("../controllers/operatorController");

router.post("/operator", createOperator);

router.get(
  "/operators/:operatorId/schedules",
  getOperatorByIdParam,
  getScheduleForOperator
);

module.exports = router;
