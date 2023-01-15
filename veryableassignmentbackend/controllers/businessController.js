const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Business = require("../models/business");
const Job = require("../models/job");

/**
 * createBusiness creates and saves a business document
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createBusiness = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const business = new Business(req.body);

  business.save((err, business) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save business in DB",
      });
    }
    res.json({
      id: business._id,
      name: business.name,
      email: business.email,
      phonenumber: business.phonenumber,
    });
  });
};

/**
 * createJobForBusiness creates a job  with owner as the business id
 * @param {*} req
 * @param {*} res
 */
const createJobForBusiness = (req, res) => {
  const job = new Job(req.body);
  const businessParent = req.business;
  job.owner = businessParent._id;

  job.save((err, job) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save business in DB",
      });
    }
    res.json({
      jobId: job._id,
      jobTitle: job.jobTitle,
      openings: job.openings,
      business: job.owner,
    });
  });
};
/**
 * getAllJobsForBusiness returns all jobs that have owner for a particular id
 * @param {*} req
 * @param {*} res
 */
const getAllJobsForBusiness = (req, res) => {
  const businessId = req.business._id;

  let businessObj = mongoose.Types.ObjectId(businessId);

  Job.find({ owner: businessObj }, function (err, result) {
    if (err || !result) {
      return res.status(400).json({
        err: `No business with id ${businessId} found`,
      });
    }
    res.json({ businessId: businessId, jobs: result });
  });
};
/**
 * getJobById returns job for mentioned jobId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getJobById = (req, res, next) => {
  const id = req.body.opsId;

  let objectId = mongoose.Types.ObjectId(id);

  Job.findById(id).exec((err, job) => {
    if (err || !job) {
      return res.status(400).json({
        err: `No job with id ${id} found`,
      });
    }
    req.job = job;
    next();
  });
};

// middle ware
/**
 * getBusinessById returns business for businessId
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} id
 */
const getBusinessById = (req, res, next, id) => {
  Business.findById(id).exec((err, business) => {
    if (err || !business) {
      return res.status(400).json({
        err: `No business with id ${id} found`,
      });
    }
    req.business = business;
    next();
  });
};

const getBusiness = (req, res) => {
  return res.json(req.business);
};

module.exports = {
  createBusiness,
  getBusinessById,
  getBusiness,
  createJobForBusiness,
  getAllJobsForBusiness,
  getJobById,
};
