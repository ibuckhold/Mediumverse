'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Categories', [
      { name: 'Arts & Entertainment' },
      { name: 'Culture' },
      { name: 'Equality' },
      { name: 'Health' },
      { name: 'Industry' },
      { name: 'Personal Development' },
      { name: 'Politics' },
      { name: 'Programming' },
      { name: 'Science' },
      { name: 'Self' },
      { name: 'Society' },
      { name: 'Technology' },
      { name: 'Superhero Insurance' },
      { name: 'Battle Fashion' },
      { name: 'Testimonials' },
      { name: 'Hydra News' },
      { name: 'Multiverse Updates' }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
