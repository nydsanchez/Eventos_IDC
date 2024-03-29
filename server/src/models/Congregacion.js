const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Congregacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
          "Estelí",
          "Granada",
          "Jinotega",
          "León",
          "Madriz",
          "Managua",
          "Masaya",
          "Matagalpa",
          "Nueva Segovia",
          "Rivas",
          "Río San Juan"
        ),
        allowNull: false,
        validate: {
          notNull: { msg: "Name is a required property." },
        },
      },
      church_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is a required property." },
        },
      },
      church_phone: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
