const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Tickets", {
    id_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },

    no_ticket: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: {
          args: [11, 11],
          msg: "El número de ticket debe tener exactamente 11 caracteres",
        },
      },
    },
    state_ticket: {
      type: DataTypes.ENUM("reservado", "utilizado", "comprado", "anulado"),
      allowNull: false,
      defaultValue: "reservado",
    },
  });
};
