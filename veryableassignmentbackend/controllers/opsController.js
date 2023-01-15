const mongoose = require("mongoose");
const Job = require("../models/job");
const Ops = require("../models/operation");

/**
 * createOperation saves a ops while assigning the operator and the job(operation)
 *
 * @param {*} req
 * @param {*} res
 * @returns schedule of the operator post assigning this op.
 */
const createOperation = (req, res) => {
  // get operator ID
  const operator = req.operator;
  // get job ID
  const job = req.job;
  if (!job || !operator) {
    return res.status(400).json({
      err: `Cant assign ops due to missing data`,
    });
  }

  const startdate = new Date(req.body.startdate);
  const enddate = new Date(req.body.enddate);

  const ops = new Ops(req.body);

  ops.job = req.job;
  ops.operator = req.operator;
  ops.startdate = startdate;
  ops.enddate = enddate;

  ops.save((err, ops) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save ops in DB",
      });
    }
    findJobsForOperator(res, req, ops, req.operator);
  });
};

/**
 * findJobsForOperator returns the schedule for the operator
 * @param {*} res
 * @param {*} req
 * @param {*} ops
 * @param {*} operatorId
 */
const findJobsForOperator = (res, req, ops, operatorId) => {
  const operatorObj = mongoose.Types.ObjectId(operatorId);
  Ops.find({ operator: operatorObj }, function (err, result) {
    if (err || !result) {
      return res.status(400).json({
        err: `No Operator with id ${operatorId} found`,
      });
    }
    var scheduleObjDTO = [];
    result.forEach(function (object) {
      const startdateTemp = new Date(object.startdate);
      const enddateTemp = new Date(object.enddate);
      const clockIn =
        startdateTemp.getHours() + ":" + startdateTemp.getMinutes();
      const clockOut = enddateTemp.getHours() + ":" + enddateTemp.getMinutes();

      scheduleObjDTO.push({
        opID: object._id,
        startDate: startdateTemp,
        endDate: enddateTemp,
        clockIn: clockIn,
        clockOut: clockOut,
      });
    });

    res.json({
      schedules: scheduleObjDTO,
    });
  });
};
module.exports = { createOperation, findJobsForOperator };
