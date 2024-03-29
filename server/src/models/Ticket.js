const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ticket",
    {
      id_ticket: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Marcar como clave primaria
      },
      vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state_ticket: {
        type: DataTypes.ENUM("reservado", "utilizado", "comprado"),
        allowNull: false,
        defaultValue: "reservado",
      },
    },
    { timestamps: false }
  );
};
