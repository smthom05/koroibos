'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('olympianEvent', [{
      id: 1,
      medal: "Gold",
      EventId: 1,
      OlympianId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      medal: "Silver",
      EventId: 1,
      OlympianId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('olympianEvent', null, {});
  }
};
