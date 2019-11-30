"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "user1",
          email: "user1@gmail.com",
          password: "123",
          roleType: 1
        },
        {
          name: "user2",
          email: "user2@gmail.com",
          password: "123",
          roleType: 2
        },
        {
          name: "user3",
          email: "user3@gmail.com",
          password: "123",
          roleType: 3
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
