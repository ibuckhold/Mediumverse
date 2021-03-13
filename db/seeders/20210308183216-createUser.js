'use strict';

const bcrypt = require("bcryptjs");

// const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [{
      username: "Demo User",
      email: "demo@demo.com",
      hashedPassword: bcrypt.hashSync("qwertyuiop321", 10)
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
