const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//get all posts for homepage
router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll({
      
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });

    }
    catch (err) {
        res.status(500).json(err);
    }      
  });

//get one post
  router.get('/post/:id', async (req, res) => {
    try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('single-post', {
        ...post,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    } catch (err) {
        res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {
    try{
    //const userData = await User.findAll();
    //res.status(200).json(userData);
    res.render('login')
    } catch (err) {
        res.status(500).json(err);
    }
      
  });

  module.exports = router;