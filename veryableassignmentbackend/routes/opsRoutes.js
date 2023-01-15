const express = require("express");
const router = express.Router();
const { createOperation } = require("../controllers/opsController");
const { getJobById } = require("../controllers/businessController");
const { getOperatorById } = require("../controllers/operatorController");

router.post("/ops", getJobById, getOperatorById, createOperation);

module.exports = router;
