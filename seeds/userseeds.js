const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'almondo23',
    email: 'almondo@abc.com',
    password: 'password12'
  },
  {
    username: 'g-unit55',
    email: 'fifty@abc.com',
    password: 'password34'
  },
  {
    username: 'ipotenuse1',
    email: 'geometry@abc.com',
    password: 'password56'
  },
  {
    username: 'darkstar#!',
    email: 'ben10fan@abc.com',
    password: 'password78'
  },
  {
    username: 'juggernautpwd',
    email: 'xmenbest@abc.com',
    password: 'password90'
  },
  {
    username: 'jdillafan12',
    email: 'southernrap00@abc.com',
    password: 'password000'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;