const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Settings",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fb_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instagram_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      twitter_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      primary_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secundary_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      header_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      footer_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      button_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      button_text_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
};
