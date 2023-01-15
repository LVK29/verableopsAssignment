const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const operationSchema = new mongoose.Schema({
  job: {
    type: ObjectId,
    ref: "Job",
    required: true,
  },
  operator: {
    type: ObjectId,
    ref: "Operator",
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Ops", operationSchema);
