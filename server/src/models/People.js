const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "People",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty." },
          notNull: { msg: "Name is a required property." },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty." },
          notNull: { msg: "Name is a required property." },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone cannot be empty." },
          notNull: { msg: "Phone is a required property." },
        },
      },
      genre: {
        type: DataTypes.ENUM("Femenino", "Masculino"),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Las opciones son Femenino o Masculino." },
          notNull: { msg: "EL genero no debe estar vacio." },
        },
      },

      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: "2000-01-01",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
