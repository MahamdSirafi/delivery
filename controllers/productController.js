const Product = require("../models/productModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllProduct = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.getAllProductCategory = factory.getField(Product, "category", {
  restaurant: "restaurantId",
});
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const doc = await Product.deleteMany({ category: req.params.category });
  res.status(200).json({
    status: "success",
    doc: null,
  });
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const doc = await Product.updateMany(
    { category: req.params.category },
    { $set: req.body }
  );
  res.status(200).json({
    status: "success",
    doc: null,
  });
});
