const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



//find all
router.get('/', async (req, res) => {
    try{
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
      
  });


//find one user
router.get('/:id', async (req, res) => {
    try{

     const userData =  await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title', 'post_id']
          }
        }
      ]
    });
    if(!userData) {
        res.status(404).json({ message: "Nothing found under this user id!"});
        return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
  });

//  users posts
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //login
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword =  userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //logout
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  //router.put
  router.put('/:id', async (req, res) => {
   try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });
      if (!userData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!userData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  