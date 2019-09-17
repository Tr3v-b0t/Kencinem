'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('movie', {
    genre: DataTypes.STRING,
    status: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cast: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  
  };
  return Movie;
};
