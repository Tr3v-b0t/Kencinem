
module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define('Seats', {
    status: DataTypes.STRING,
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cinemaId: DataTypes.INTEGER,
    seatNumber: DataTypes.STRING,
  }, {});
  Seats.associate = function (models) {
    // associations can be defined here
    Seats.belongsTo(models.Cinema, {
      foreignKey: 'cinemaId',
      onDelete: 'CASCADE',
    });
    Seats.belongsTo(models.Tickets, {
      foreignKey: 'ticketId',
      onDelete: 'CASCADE',
    });
    Seats.belongsTo(models.Movie, {
      foreignKey: 'movieId',
      onDelete: 'CASCADE',
    });
  };
  return Seats;
};
