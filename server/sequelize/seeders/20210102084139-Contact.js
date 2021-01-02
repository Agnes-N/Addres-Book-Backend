/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Contacts', [{
      id: 1,
      userId: 1,
      names: 'kella',
      phoneNumber: '0781122334',
      email: 'kella@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Contacts', null, {}),
};
