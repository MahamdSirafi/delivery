const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");
const Product = require("../models/productModel");
const Location = require("../models/locationModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const { cart } = require("../class/cart");
const axios = require("axios");
exports.getAllOrder = factory.getAllpop1(
  Order,
  {
    path: "user",
    select: "name phone -_id",
  },
  {
    path: "cart.product",
    select: "name price -_id",
  },
  {
    path: "delivery",
    select: "firstName lastName phone -_id",
  },
  {
    path: "location",
  }
);
exports.getOrder = factory.getOne(
  Order,
  {
    path: "user",
    select: "name phone -_id",
  },
  {
    path: "cart.product",
    select: "name price -_id",
  },
  {
    path: "delivery",
    select: "firstName lastName phone -_id",
  },
  {
    path: "location",
  },
  {
    path: "restaurant",
    select: "name -_id",
  }
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = catchAsync(async (req, res, next) => {
  const thisRestaurant = await Restaurant.findById(req.body.restaurant);
  let total = 0;
  let thisProduct;
  let arrcart = [];
  req.body.cart.forEach(async (element, index) => {
    thisProduct = await Product.findById(element.product);
    if (!thisProduct) return next(new AppError("Product is not defind", 400));
    arrcart.push(
      new cart(
        element.product,
        element.quantity,
        thisProduct.price * element.quantity
      )
    );
    total += thisProduct.price * element.quantity;
  });
  /////////////////////////////////////////////يتطلب اتصال بشبكة//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const locationRestaurant = await Location.findById(thisRestaurant.location);
  const locationUser = await Location.findById(req.body.location);
  if (!locationRestaurant || !locationUser)
    return next(new AppError("Location is not defund", 400));
  // تعيين إحداثيات النقطتين
  const point1 = {
    latitude: locationRestaurant.Latitude,
    longitude: locationRestaurant.Longitude,
  };
  const point2 = {
    latitude: locationUser.Latitude,
    longitude: locationUser.Longitude,
  };
  const apiUrl = `https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?overview=false`; //جلب المسافة والمدة بين نقطتين
  // const apiUrl=`https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?steps=true`;//تفاصيل النقاط على الطريق
  axios
    .get(apiUrl)
    .then(async (response) => {
      const data = response.data;
      req.body.cart = arrcart;
      req.body.priceDelivery = data.routes[0].distance * 0.02 || 20;
      req.body.duration = Math.ceil((data.routes[0].duration * 2) / 60);
      req.body.total = req.body.priceDelivery + total;
      req.body.user = req.user._id;
      const doc = await Order.create(req.body);
      res.status(200).json({
        status: "success",
        doc,
      });
    })
    .catch((error) => {
      res.status(400).json({ status: "errors", message: error.message });
    });
  /////////////////////////////////////////////بدون اتصال///////////////////////////////////////////////////
  // req.body.cart = arrcart;
  // req.body.priceDelivery = 100 + Math.random * 5000;
  // req.body.duration = 5 + Math.random * 50;
  // req.body.total = total + req.body.priceDelivery;
  // req.body.user = req.user._id;
  // const doc = await Order.create(req.body);
  // res.status(200).json({
  //   status: "success",
  //   doc,
  // });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
});
exports.updateOrderErr = catchAsync(async (req, res, next) => {
  const thisRestaurant = await Restaurant.findById(req.body.restaurant);
  let total = 0;
  let thisProduct;
  if (req.body.cart) {
    let arrcart = [];
    req.body.cart.forEach(async (element, index) => {
      thisProduct = await Product.findById(element.product);
      if (!thisProduct) return next(new AppError("Product is not defind", 400));
      arrcart.push(
        new cart(
          element.product,
          element.quantity,
          thisProduct.price * element.quantity
        )
      );
      total += thisProduct.price * element.quantity;
    });
    req.body.cart = arrcart;
  }
  ///////////////////////////////اتصال بالنت/////////////////////////////////////////////////////////////////////////
  const locationRestaurant = await Location.findById(thisRestaurant.location);
  const locationUser = await Location.findById(req.body.location);
  if (!locationRestaurant || !locationUser)
    return next(new AppError("Location is not defund", 400));
  const point1 = {
    latitude: locationRestaurant.Latitude,
    longitude: locationRestaurant.Longitude,
  };
  const point2 = {
    latitude: locationUser.Latitude,
    longitude: locationUser.Longitude,
  };
  const apiUrl = `https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?overview=false`; //جلب المسافة والمدة بين نقطتين
  // const apiUrl=`https://router.project-osrm.org/route/v1/driving/${point1.longitude},${point1.latitude};${point2.longitude},${point2.latitude}?steps=true`;//تفاصيل النقاط على الطريق
  axios
    .get(apiUrl)
    .then(async (response) => {
      const data = response.data;
      req.body.priceDelivery = data.routes[0].distance * 0.02 || 20;
      req.body.duration = Math.ceil((data.routes[0].duration * 2) / 60);
      req.body.total = req.body.priceDelivery + total;
      req.body.user = req.user._id;
      const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        doc,
      });
    })
    .catch((error) => {
      res.status(400).json({ status: "errors", message: error.message });
    });
  /////////////////////////////////////////////بدون اتصال///////////////////////////////////////////////////
  // req.body.cart = arrcart;
  // req.body.priceDelivery = 100 + Math.random * 5000;
  // req.body.duration = 5 + Math.random * 50;
  // req.body.total = total + req.body.priceDelivery;
  // req.body.user = req.user._id;
  // req.body.cart = arrcart;
  // req.body.priceDelivery = 100 + Math.random * 5000;
  // req.body.duration = 5 + Math.random * 50;
  // req.body.total = total + req.body.priceDelivery;
  // req.body.user = req.user._id;
  // const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
  // new: true,
  // runValidators: true,
  // });
  // res.status(200).json({
  //   status: "success",
  //   doc,
  // });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
});
exports.chekOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findById(req.params.id);
  if (doc.status != ("Accepted" || "Placed"))
    return next(new AppError("the order Preparing", 400));
  next();
});

exports.statisticsWithLinkUser = factory.statisticsWithLink(
  Order,
  "priceDelivery",
  "users",
  "user",
  "user.name",
  "user.phone",
  "user.email"
);
//كود الاحصائيات بدون تابع
// catchAsync(async (req, res, next) => {
//   const doc = await Order.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         "user.name": 1,
//         "user.phone": 1,
//         "user.email": 1,
//         priceDelivery: 1,
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
//         _id: "$user",
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
// });
