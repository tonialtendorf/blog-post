const router = require("express").Router();
const withAuth = require('../utils/auth')
const { Product, User } = require("../models");

//get all products and join with user data
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
      {
        model: User,
        attributes: ['name']
      }
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));

    res.render('homepage', {
      products,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/shoppingList/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render("shopping", {
      ...product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/shoppingList", async (req, res) => {  
  try {
    const productData = await Product.findAll({
      include: [
      {
        model: User,
        attributes: ['name']
      }
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));
    res.render('shopping', {
      products,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

// 

// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
