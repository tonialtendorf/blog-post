//Import sequelize
const router = require("express").Router();

//Import route handlers
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");

//Use productRoutes for any requests with /product
router.use("/shoppingList", productRoutes);

//Use userRoutes for any requests with /user
router.use("/user", userRoutes);

//Export router object for use with main app
module.exports = router;
