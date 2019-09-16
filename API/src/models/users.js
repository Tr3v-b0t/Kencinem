"use strict";
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "users",
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
        Users.hasMany(models.tickets, {
            foreignKey: "userId",
            as: "tickets",
            onDelete: "cascade"
        });
        Users.hasMany(models.payments, {
            foreignKey: "userId",
            as: "payments",
            onDelete: "cascade"
        });
    };
    return Users;
};
