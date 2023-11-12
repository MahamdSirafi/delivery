const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { checkOwner } = require("../middlewares/checkMiddleware");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const orderController = require("../controllers/orderController");
router.use(authMiddlewers.protect);
router
  .route("/agguser/:year/:month")
  .get(
    authMiddlewers.restrictTo("admin"),
    orderController.statisticsWithLinkUser
  );
router
  .route("/work_me")
  .get(
    authMiddlewers.restrictTo("delivery"),
    dynamicMiddleware.addQuery("delivery", "userId"),
    dynamicMiddleware.addQuery("paid", "false"),
    orderController.getAllOrder
  );
router
  .route("/need_work")
  .get(
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.addQuery("delivery", null),
    orderController.getAllOrder
  );

router
  .route("/")
  .get(authMiddlewers.restrictTo("mgr", "admin"), orderController.getAllOrder)
  .post(
    authMiddlewers.restrictTo("user"),
    dynamicMiddleware.addVarBody("user", "userId"),
    orderController.createOrder
  );
router
  .route("/:id")
  .get(authMiddlewers.restrictTo("user", "delivery"), orderController.getOrder)
  .patch(
    authMiddlewers.restrictTo("user", "delivery", "mgr"),
    orderController.updateOrder
  )
  .delete(
    authMiddlewers.restrictTo("admin", "mgr"),
    orderController.deleteOrder
  );
router
  .route("/:id/accepted")
  .patch(
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.addVarBody("status", "Accepted"),
    orderController.updateOrder
  );
router
  .route("/:id/cancelled")
  .patch(
    authMiddlewers.restrictTo("mgr"),
    dynamicMiddleware.addVarBody("status", "Cancelled"),
    orderController.updateOrder
  );
router
  .route("/:id/preparing")
  .patch(
    authMiddlewers.restrictTo("delivery"),
    checkOwner(Order, "delivery"),
    dynamicMiddleware.addVarBody("status", "Preparing"),
    orderController.updateOrder
  );
router
  .route("/:id/delivereing")
  .patch(
    authMiddlewers.restrictTo("delivery"),
    checkOwner(Order, "delivery"),
    dynamicMiddleware.addVarBody("status", "Out For Delivery"),
    orderController.updateOrder
  );
router
  .route("/:id/completed")
  .patch(
    authMiddlewers.restrictTo("user"),
    checkOwner(Order, "user"),
    dynamicMiddleware.addVarBody("status", "Completed"),
    orderController.updateOrder
  );
router
  .route("/:id/paid")
  .patch(
    authMiddlewers.restrictTo("delivery"),
    checkOwner(Order, "delivery"),
    dynamicMiddleware.addVarBody("paid", "true"),
    orderController.updateOrder
  );
router
  .route("/:id/err")
  .patch(
    authMiddlewers.restrictTo("user"),
    orderController.chekOrder,
    orderController.updateOrderErr
  );
module.exports = router;
