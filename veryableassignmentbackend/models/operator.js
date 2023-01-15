const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  schedules: [{ type: ObjectId, ref: "Ops" }],
});

module.exports = mongoose.model("Operator", operatorSchema);
