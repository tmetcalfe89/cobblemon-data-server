const mongoose = require("mongoose");

const Range = new mongoose.Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  }
});

module.exports = Range;