const { Post } = require('../models');

const postdata = [
  {
    title: 'Asus',
    post_text: 'Decent brand of laptop but has fallen behind a lot of different brands that exist.',
    user_id: 5
  },
  {
    title: 'Lenovo',
    post_text: 'Personal computer brand of choice. I recommend the lenovo model Yoga y40-80.',
    user_id: 4
  },
  {
    title: 'Apple',
    post_text: 'Will work exactly the way you wanted without the hassle of setting up a pc. Just be ready to spend an arm and leg on money.',
    user_id: 3
  },
  {
    title: 'Acer',
    post_text: 'The new dell',
    user_id: 2
  },
  {
    title: 'Dell',
    post_text: 'The commodore 64 of computer hardware. It is ok to not have a lot of money on hand. But you broke!',
    user_id: 1
  },
  {
    title: 'Alienware',
    post_text: 'Other people must know I am the tech guy in the room ',
    user_id: 6
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
