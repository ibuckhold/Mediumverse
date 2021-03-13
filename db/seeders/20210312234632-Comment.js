'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // return queryInterface.bulkInsert('People', [{
    //   name: 'John Doe',
    //   isBetaMember: false
    // }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
