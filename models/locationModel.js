const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  Longitude: {
    type: Number,
    required: [true, "A location must have a Longitude"],
  },
  Latitude: {
    type: Number,
    required: [true, "A location must have a Latitude"],
  },
  region: {
    type: String,
    required: [true, "A location must have a region"],
  },
  street: {
    type: String,
    required: [true, "A location must have a street"],
  },
});
const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
