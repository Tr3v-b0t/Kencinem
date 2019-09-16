
module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define('seats', {
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
    Seats.belongsTo(models.cinema, {
      foreignKey: 'cinemaId',
      onDelete: 'CASCADE',
    });
    Seats.belongsTo(models.tickets, {
      foreignKey: 'ticketId',
      onDelete: 'CASCADE',
    });

  };
  return Seats;
};
