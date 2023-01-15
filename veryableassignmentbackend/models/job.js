const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    descriptions: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    openings: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
