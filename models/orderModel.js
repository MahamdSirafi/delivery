const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: [true, "enter filde Restaurant"],
  },
  cart: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: {
        type: Number,
        required: [true, "A product must have a price"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A order must have a user"],
  },
  delivery: {
    type: mongoose.Schema.ObjectId,
    ref: "Delivery",
    default: null,
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
    required: [true, "restaurant must have a Location."],
  },
  priceDelivery: {
    type: Number,
    required: [true, "A order must have a total"],
  },
  total: {
    type: Number,
    required: [true, "A order must have a total"],
  },
  duration: {
    type: Number,
    required: [true, "A order must have a Duration"],
  },
  status: {
    type: String,
    required: true,
    enum: [
      "Placed",
      "Cancelled",
      "Accepted",
      "Preparing",
      "Out For Delivery",
      "Completed",
    ],
    default: "Placed",
  },
  paid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
