const router = require("express").Router();
const withAuth = require('../utils/auth')
const { Blog, User } = require("../models");

//get all products and join with user data
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
      {
        model: User,
        attributes: ['name']
      }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/blog", async (req, res) => {  
  try {
    const blogData = await Blog.findAll({
      include: [
      {
        model: User,
        attributes: ['name']
      }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('blog', {
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
