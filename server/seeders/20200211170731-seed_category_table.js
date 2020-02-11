'use strict';
let seed = [
  {
    status: 'Back-log'
  },
  { 
    status: 'To do'
  },
  {
    status: 'In progress'
  },
  {
    status: 'Done'
  }
]

module.exports = {  
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Categories', seed, {});
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
