module.exports = (sequelize, DataTypes) => {
  const Cinema = sequelize.define('cinema', {
    location: DataTypes.STRING,
    numberOfSeats: DataTypes.INTEGER,
    openTime: DataTypes.TIME,
    closeTime: DataTypes.TIME,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    holidays: DataTypes.STRING,
  }, {});
  Cinema.associate = function (models) {
    // associations can be defined here
    Cinema.hasMany(models.seats, {
        foreignKey: "cinemaId",
        as: "seats",
        onDelete: "cascade"
    });
  };
  return Cinema;
};
