const Delivery = require("../models/deliveryModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllDelivery = factory.getAll(Delivery);
exports.getDelivery = factory.getOne(Delivery);
exports.updateDelivery = factory.updateOne(Delivery);
exports.deleteDelivery = factory.deleteOne(Delivery);
exports.createDelivery = catchAsync(async (req, res, next) => {
  const bodyDelivery = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    work_hours: req.body.work_hours,
  };
  const doc = await Delivery.create(bodyDelivery);
  const bodyUser = {
    _id: doc._id,
    name: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
    role: "delivery",
    phone: req.body.phone,
  };
  const newuser = await User.create(bodyUser);
  if (!newuser) {
    return next(new AppError("error createing user", 400));
  }
  res.status(201).json({
    status: "success",
    doc,
  });
});
exports.statisticsWithLinkDelivery = factory.statisticsWithLink(
  Order,
  "priceDelivery",
  "deliveries",
  "delivery",
  "delivery.firstName",
  "delivery.lastName"
);
