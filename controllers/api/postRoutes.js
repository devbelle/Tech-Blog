const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all users
router.get('/', withAuth, async (req, res) => {
   try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'],
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
    if(!postData) {
        res.status(404).json({ message: "Nothing found under this post id!"});
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
  });

  //get one user
  router.get('/', withAuth, async (req, res) => {
    try {
     const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
         'id',
         'post_text',
         'title',
         'created_at'],
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
     if(!postData) {
         res.status(404).json({ message: "Nothing found under this post id!"});
         return;
         }
         res.status(200).json(postData);
     } catch (err) {
         res.status(500).json(err)
     }
   });

   // creating post data 
   router.post('/', withAuth, async (req, res) => {
    try {
    const postData = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id
    });
    if(!postData) {
        res.status(404).json({ message: "Nothing found under this post id!"});
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
  });

  //updating posts
  router.put('/:id', withAuth, async (req, res) => {
    try {
    const postData = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
      })
      if(!postData) {
        res.status(404).json({ message: "Nothing found under this post id!"});
        return;
        }
        res.status(200).json(postData);
        } catch (err) {
        res.status(500).json(err)
        }
  });

  //deleting posts
  router.delete('/:id', withAuth, async (req, res) => {
    try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!postData) {
        res.status(404).json({ message: "Nothing found under this post id!"});
        return;
        }
        res.status(200).json(postData);
        } catch (err) {
        res.status(500).json(err)
        }
  });

  module.exports = router;