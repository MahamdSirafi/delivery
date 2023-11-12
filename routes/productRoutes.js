const express = require("express");
const router = express.Router({ mergeParams: true });
const Restaurant = require("../models/restaurantModel");
const authMiddlewers = require("../middlewares/authMiddlewers");
const dynamicMiddleware = require("../middlewares/dynamicMiddleware");
const imgproductMiddlewers = require("../middlewares/imgprodectMiddlewar");
const productController = require("../controllers/productController");
const { checkOwner } = require("../middlewares/checkMiddleware");
router.use(authMiddlewers.protect);
router.route("/category").get(productController.getAllProductCategory);
router
  .route("/category/:category")
  .delete(productController.deleteCategory)
  .put(productController.updateCategory);
router
  .route("/")
  .get(
    dynamicMiddleware.addQuery("restaurant", "restaurantId"),
    productController.getAllProduct
  )
  .post(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "restaurantId"),
    productController.createProduct
  );
router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "restaurantId"),
    productController.updateProduct
  )
  .delete(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "restaurantId"),
    productController.deleteProduct
  );
router
  .route("/:id/uplode")
  .patch(
    authMiddlewers.restrictTo("mgrRestaurant"),
    checkOwner(Restaurant, "owner", "restaurantId"),
    imgproductMiddlewers.uploadProdectPhoto,
    dynamicMiddleware.filteredBody("image"),
    dynamicMiddleware.setPathImginBody("prodects", "image"),
    productController.updateProduct
  );
module.exports = router;
