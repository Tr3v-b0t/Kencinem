'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define('Seats', {
    status: DataTypes.STRING,
    ticketId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    cinemaId: DataTypes.INTEGER
  }, {});
  Seats.associate = function(models) {
    // associations can be defined here
  };
  return Seats;
};