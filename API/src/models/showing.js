'use strict';
module.exports = (sequelize, DataTypes) => {
    const Showing = sequelize.define(
        'Showing',
        {
            cinemaId: DataTypes.INTEGER,
            movieId: DataTypes.INTEGER,
            time: DataTypes.TIME
        },
        {}
    );
    Showing.associate = function(models) {
        // associations can be defined here
    };
    return Showing;
};
