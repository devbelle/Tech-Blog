const router = require('express').Router();
const { Comment } = require('../../models');
const { response } = require('express');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', withAuth, async (req, res) => {
    try{
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//create comment
router.post('/', withAuth, async (req, res) => {
    try {
    const commentData = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    });
    if(!commentData) {
        res.status(404).json({ message: "Cannot create comment!"});
        return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
  });

  //delete comment
  router.delete('/:id', withAuth, async (req, res) => {
    try { 
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!commentData) {
        res.status(404).json({ message: "Cannot delete comment!"});
        return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
  });

  module.exports = router;