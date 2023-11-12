const Review = require("./../models/reviewModel");
const Restaurant = require("../models/restaurantModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getAllReviewsRes = catchAsync(async (req, res, next) => {
  const thisRestaurant = await Restaurant.find(
    { owner: req.user._id },
    { _id: 1 }
  );
  let arrRes = [];
  thisRestaurant.forEach((item) => {
    arrRes.push(item._id);
  });
  const doc = await Review.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "order",
        foreignField: "_id",
        as: "order",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "prodeucts",
        localField: "order.cart.product",
        foreignField: "_id",
        as: "prodeuct",
      },
    },
    {
      $match: {
        "order.restaurant": { $in: arrRes },
        type: "order",
      },
    },
    {
      $project: {
        "user.name": 1,
        "user.phone": 1,
        review: 1,
        createdAt: 1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    doc,
  });
});
