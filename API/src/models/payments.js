'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments', {
    ticketId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    time: DataTypes.TIME
  }, {});
  Payments.associate = function(models) {
    // associations can be defined here
  };
  return Payments;
};