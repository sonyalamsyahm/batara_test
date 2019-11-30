"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "shares",
      [
        {
          userId: 3,
          newsId: 9,
          mediaId: 2
        },
        {
          userId: 3,
          newsId: 10,
          mediaId: 1
        },
        {
          userId: 3,
          newsId: 11,
          mediaId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
