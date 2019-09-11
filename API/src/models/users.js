"use strict";
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            temporaryToken: DataTypes.STRING,
            verified: DataTypes.BOOLEAN
        },
        {}
    );
    Users.associate = function(models) {
        // associations can be defined here
        Users.hasMany(models.Tickets, {
            foreignKey: "userId",
            as: "tickets"
        });
        Users.hasMany(models.Payments, {
            foreignKey: "userId",
            as: "payments"
        });
    };
    return Users;
};
