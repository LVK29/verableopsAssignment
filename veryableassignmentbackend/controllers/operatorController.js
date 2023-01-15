const Operator = require("../models/operator");
const { findJobsForOperator } = require("../controllers/opsController");

/**
 * createOperator creates and saves the operator document
 * @param {*} req
 * @param {*} res
 */
const createOperator = (req, res) => {
  const operator = new Operator(req.body);

  operator.save((err, operator) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save operator in DB",
      });
    }
    res.json({
      id: operator._id,
      name: operator.name,
      email: operator.email,
      phonenumber: operator.phonenumber,
      userinfo: operator.userinfo,
      schedules: operator.schedules,
    });
  });
};

/**
 * getOperatorByIdParam gets operator document from  operatorId present in request param, used by getSchedulesFor Operator API
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOperatorByIdParam = (req, res, next) => {
  const operatorId = req.params.operatorId;

  Operator.findById(operatorId).exec((err, operator) => {
    if (err || !operator) {
      return res.status(400).json({
        err: `No operator with id ${operatorId} found`,
      });
    }

    req.operator = operator;
    next();
  });
};

const getScheduleForOperator = (req, res) => {
  findJobsForOperator(res, req, {}, req.operator);
};

/**
 * getOperatorById gets operator document from  operatorId present in request body (used by create ops api)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOperatorById = (req, res, next) => {
  const operatorId = req.body.operatorId;
  Operator.findById(operatorId).exec((err, operator) => {
    if (err || !operator) {
      return res.status(400).json({
        err: `No operator with id ${operatorId} found`,
      });
    }

    req.operator = operator;
    next();
  });
};

module.exports = {
  createOperator,
  getScheduleForOperator,
  getOperatorById,
  getOperatorByIdParam,
};
