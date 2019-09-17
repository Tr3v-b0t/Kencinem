'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define('tickets', {
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timeOfPurchase: DataTypes.TIME,
    movieId: DataTypes.INTEGER,
    ticketToken: DataTypes.STRING,
    expiryDate: DataTypes.TIME,
    movieDuration: DataTypes.INTEGER,
    status: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Tickets.associate = function(models) {
    // associations can be defined here
    Tickets.hasMany(models.seats, {
        foreignKey: "ticketId",
        as: "seats",
        onDelete: "cascade"
    });

  };
  return Tickets;
};
