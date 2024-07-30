const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Tickets", {
    id_ticket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    state_ticket: {
      type: DataTypes.ENUM("reservado", "utilizado"),
      allowNull: false,
      defaultValue: "reservado",
    },
    awared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
