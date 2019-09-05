
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('seats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Available',
      allowNull: false,
    },
    ticketId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'tickets',
        key: 'id',
        as: 'ticketId',
      },
    },
    movieId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'movies',
        key: 'id',
        as: 'movieId',
      },
    },
    cinemaId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      references: {
        model: 'cinemas',
        key: 'id',
        as: 'cinemaId',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Seats'),
};
