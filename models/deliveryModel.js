const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  work_hours: {
    type: Number,
    required: [true, "delivery must have work hours"],
  },
  // busy: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    // set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});
const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;
