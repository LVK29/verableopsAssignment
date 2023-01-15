const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  createBusiness,
  getBusinessById,
  createJobForBusiness,
  getAllJobsForBusiness,
} = require("../controllers/businessController");

router.param("businessId", getBusinessById);
// performing rudemantory validations
router.post(
  "/businesses",
  [
    check("name", "Name should be longer than 3 characters").isLength({
      min: 3,
    }),
    check("email", "Invalid email").isEmail(),
  ],
  createBusiness
);

router.post("/businesses/:businessId/job", createJobForBusiness);

router.get("/businesses/:businessId/jobs", getAllJobsForBusiness);

module.exports = router;
