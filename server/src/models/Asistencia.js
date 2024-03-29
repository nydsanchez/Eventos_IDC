const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Asistencia",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      checkin_date: {
        type: DataTypes.DATE,
      },
      data_confirm: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
