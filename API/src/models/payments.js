module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('payments', {
    ticketId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    time: DataTypes.TIME,
  }, {});
  Payments.associate = function (models) {
    // associations can be defined here
    Payments.hasOne(models.tickets, {
        foreignKey: "ticketId",
        as: "seats",
        onDelete: "cascade"
    });
  };
  return Payments;
};
