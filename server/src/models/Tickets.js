const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Tickets",
    {
      id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Marcar como clave primaria
      },
      id_ticket: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    {
      timestamps: false,
    }
  );
};
