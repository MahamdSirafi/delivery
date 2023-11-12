const Restaurant = require("../models/restaurantModel");
const Order = require("../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("../utils/handlerFactory");
exports.getAllRestaurant = factory.getAllpop1(
  Restaurant,
  {
    path: "location",
    select: "-__v -_id",
  },
  {
    path: "owner",
    select: "name phone email -_id",
  }
);
exports.getRestaurant = factory.getOne(
  Restaurant,
  {
    path: "location",
    select: "-__v -_id",
  },
  {
    path: "owner",
    select: "name phone email -_id",
  }
);
exports.updateRestaurant = factory.updateOne(Restaurant);
exports.createRestaurant = factory.createOne(Restaurant);
exports.deleteRestaurant = factory.deleteOne(Restaurant);
exports.statisticsWithLinkRestaurant = factory.statisticsWithLink(
  Order,
  "priceDelivery",
  "restaurants",
  "restaurant",
  "restaurant.name"
);
exports.getNearRegion = catchAsync(async (req, res, next) => {
  const doc = await Restaurant.aggregate([
    {
      $lookup: {
        from: "locations",
        localField: "location",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $match: {
        "location.region": req.params.region,
      },
    },
  ]);
  res.status(200).json({ status: "success", results: doc.length, doc });
});
///////////////////////////////////////////احصائيات يدوي//////////////////////////////////////////////////
// catchAsync(async (req, res, next) => {
//   const doc = await Order.aggregate([
//     {
//       $lookup: {
//         from: "restaurants",
//         localField: "restaurant",
//         foreignField: "_id",
//         as: "restaurant",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         "restaurant.name": 1,
//         priceDelivery: 1,
//         // createdAt: 1,
//         year: { $year: "$createdAt" },
//         month: { $month: "$createdAt" },
//         day: { $dayOfMonth: "$createdAt" },
//       },
//     },
//     {
//       $match: { year: +req.params.year, month: +req.params.month },
//     },
//     {
//       $group: {
//         _id: "$restaurant",
//         totalOrders: { $sum: 1 },
//         totalPrice: { $sum: "$priceDelivery" },
//         avglPrice: { $avg: "$priceDelivery" },
//         maxlPrice: { $max: "$priceDelivery" },
//         minlPrice: { $min: "$priceDelivery" },
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: "success",
//     doc,
//   });
// });
///////////////////////////////////////Near/////////////////////////////////////////
// exports.getNearRestaurant = catchAsync(async (req, res, next) => {
//   const doc = await Restaurant.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: "Point",
//           coordinates: [
//             parseFloat(req.params.longitude),
//             parseFloat(req.params.latitude),
//           ],
//         },
//         distanceField: "distance",
//         spherical: true,
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: "success",
//     results: doc.length,
//     doc: doc,
//   });
// });
/////////////////////////////////////////////////////////////////////////////////
