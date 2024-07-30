const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Churches",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      church_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Name cannot be empty." },
          notNull: { msg: "Name is a required property." },
        },
      },
      church_state: {
        type: DataTypes.ENUM(
          "Boaco",
          "Carazo",
          "Chinandega",
          "Chontales",
          "Esteli",
          "Granada",
          "Jinotega",
          "Leon",
          "Madriz",
          "Managua",
          "Masaya",
          "Matagalpa",
          "Nueva Segovia",
          "Rivas",
          "Rio San Juan"
        ),
        allowNull: false,
        validate: {
          notNull: { msg: "Name is a required property." },
        },
      },
      church_address: {
        type: DataTypes.STRING,
      },
      church_phone: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
