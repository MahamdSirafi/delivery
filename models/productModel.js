const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: [true, "enter filde Restaurant"],
  },
  category: {
    type: String,
    trim: true,
    required: [true, "enter filde category"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "enter filde name"],
  },
  image: {
    type: String,
    required: [true, "enter filde image"],
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "enter filde price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
