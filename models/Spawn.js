const triBoolean = require("../data/triBoolean.json");

const mongoose = require("mongoose");
const Range = require("./Range");

const Condition = new mongoose.Schema({
  dimensions: [{
    type: String,
  }],
  biomes: [{
    type: String
  }],
  moonPhase: [{
    type: Range
  }],
  canSeeSky: {
    type: String,
    required: true,
    enum: triBoolean
  },
  minX: {
    type: Number,
    required: false,
  },
  minY: {
    type: Number,
    required: false,
  },
  minZ: {
    type: Number,
    required: false,
  },
  maxX: {
    type: Number,
    required: false,
  },
  maxY: {
    type: Number,
    required: false,
  },
  maxZ: {
    type: Number,
    required: false,
  },
  minLight: {
    type: Number,
    required: false,
  },
  maxLight: {
    type: Number,
    required: false,
  },
  minSkyLight: {
    type: Number,
    required: false,
  },
  maxSkyLight: {
    type: Number,
    required: false,
  },
  isRaining: {
    type: String,
    required: true,
    enum: triBoolean
  },
  isThundering: {
    type: String,
    required: true,
    enum: triBoolean
  },
  timeRange: [{
    type: Range
  }],
  structures: [{
    type: String,
  }]
});

const schema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: false
  },
  version: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  pokemon: {
    name: {
      type: String,
      required: true,
    },
    aspects: [{
      type: String
    }]
  },
  sname: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  bucket: {
    type: String,
    required: true,
  },
  condition: {
    type: Condition
  },
  antiCondition: {
    type: Condition
  },
  level: [{
    type: Range,
    required: true,
  }],
  presets: [{
    type: String,
  }],
});

schema.virtual("species", {
  ref: "Species",
  localField: "sname",
  foreignField: "sname",
  justOne: true
});

module.exports = mongoose.model("Spawn", schema);