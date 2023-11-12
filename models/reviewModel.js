const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");
const Delivery = require("./deliveryModel");
const reviewSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["delivery", "order"],
    default: "delivery",
  },
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: [true, "Review must belong to a tour."],
    unique: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
});

reviewSchema.post("save", async (doc) => {
  if (doc.type == "delivery") {
    let thisOrder = await Order.findById(doc.order);
    let delivery = await Delivery.findById(thisOrder.delivery);
    delivery.ratingsQuantity++;
    delivery.ratingsAverage =
      (delivery.ratingsAverage * (delivery.ratingsQuantity - 1) + doc.rating) /
      delivery.ratingsQuantity;
    delivery.save();
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
