'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.tickets, {
      foreignKey: 'userId',
      as: 'tickets',
    });
    Users.hasMany(models.payments, {
      foreignKey: 'userId',
      as: 'payments',
    });
  };
  return Users;
};