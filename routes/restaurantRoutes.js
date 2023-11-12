const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurantModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const imgRestaurantMiddlewar = require("../middlewares/imgrestaurantMiddlewar");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const { checkOwner } = require("../middlewares/checkMiddleware");
const restaurantController = require("../controllers/restaurantController");
const productRoutes = require("./productRoutes");
router.use("/:restaurantId/products", productRoutes);
router.use(authMiddlewers.protect);
router.route("/inRegion/:region").get(restaurantController.getNearRegion);
router
  .route("/statistics/:year/:month")
  .get(
    authMiddlewers.restrictTo("admin"),
    restaurantController.statisticsWithLinkRestaurant
  );

router
  .route("/")
  .get(restaurantController.getAllRestaurant)
  .post(
    authMiddlewers.restrictTo("admin"),
    restaurantController.createRestaurant
  );
router
  .route("/:id")
  .get(restaurantController.getRestaurant)
  .patch(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "id"),
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddlewers.restrictTo("admin"),
    restaurantController.deleteRestaurant
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "id"),
    imgRestaurantMiddlewar.uploadRestaurantPhoto,
    dynamicMiddleware.filteredBody("imageCover", "logo"),
    dynamicMiddleware.setPathImginBody("restaurants", "imageCover", "logo"),
    restaurantController.updateRestaurant
  );
// router
// .route("/near/:longitude/:latitude")
// .get(restaurantController.getNearRestaurant);
module.exports = router;
