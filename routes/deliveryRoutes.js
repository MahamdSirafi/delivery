const express = require("express");
const router = express.Router();
const authMiddlewers = require("../middlewares/authMiddlewers");
const deliveryController = require("../controllers/deliveryController");
router.use(authMiddlewers.protect);
authMiddlewers.restrictTo("mgr", "admin"),
  router
    .route("/statistics/:year/:month")
    .get(deliveryController.statisticsWithLinkDelivery);
router
  .route("/")
  .get(deliveryController.getAllDelivery)
  .post(deliveryController.createDelivery);
router
  .route("/:id")
  .get(deliveryController.getDelivery)
  .patch(deliveryController.updateDelivery)
  .delete(deliveryController.deleteDelivery);
module.exports = router;
