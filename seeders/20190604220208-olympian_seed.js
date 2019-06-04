'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Olympians', [{
      id: 1,
      name: 'Scott Thomas',
      age: 30,
      sex: 'M',
      weight: 67,
      team: "United States",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Tim Allen',
      age: 29,
      sex: 'M',
      weight: 47,
      team: "United States",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Julia Marcos',
      age: 24,
      sex: 'F',
      weight: 40,
      team: "Spain",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Olympians', null, {});
  }
};
