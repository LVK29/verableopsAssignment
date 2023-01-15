const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  businessinfo: {
    type: String,
    trim: true,
    maxlength: 5000,
  },
});

module.exports = mongoose.model("Business", businessSchema);
