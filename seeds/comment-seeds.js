const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Still learning about tech.',
    user_id: 1,
    post_id: 6
  },
  {
    comment_text: 'Do not trust my opinions.',
    user_id: 2,
    post_id: 5
  },
  {
    comment_text: 'Definitely trust my opinions.',
    user_id: 3,
    post_id: 4
  },
  {
    comment_text: 'Flip a coin to see if I am right or wrong.',
    user_id: 4,
    post_id: 3
  },
  {
    comment_text: 'I am probably correct....maybe..',
    user_id: 5,
    post_id: 2
  },
  {
    comment_text: 'Do not worry, maybe try some hapiness.',
    user_id: 6,
    post_id: 1
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;