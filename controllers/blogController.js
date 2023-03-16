const router = require('express').Router();
const sequelize = require('../config/connection');
const Blog = require('../models/blog');

exports.getAllBlogs = async (req, res) => {

  try{ 
    const blogData = await Blog.findAll();
    if(!blogData) {
        res.status(404).json({message: 'No blogs!'});
        return;
    }
    const blogs = blogData.map( dish => {
      return blog.get({ plain: true});
    })
   
    res.render('all', { blogs });
  } catch (err) {
      res.status(500).json(err);
  };     
};


// route to get one blog
exports.getSingleBlog = async (req, res) => {
  try{ 
      const blogData = await Blog.findByPk(req.params.id);
      if(!blogData) {
          res.status(404).json({message: 'No blog with this id!'});
          return;
      }
      const blog = blogData.get({ plain: true });
      res.render('blog', blog);
    } catch (err) {
        res.status(500).json(err);
    };     
};
