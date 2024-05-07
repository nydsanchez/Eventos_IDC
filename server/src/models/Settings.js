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

        validate: {
          isUrl: true, // Validación de URL
        },
      },

      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // Validación de correo electrónico
        },
      },
      fb_url: {
        type: DataTypes.STRING,

        validate: {
          isUrl: true, // Validación de URL
        },
      },
      instagram_url: {
        type: DataTypes.STRING,

        validate: {
          isUrl: true, // Validación de URL
        },
      },
      twitter_url: {
        type: DataTypes.STRING,

        validate: {
          isUrl: true, // Validación de URL
        },
      },
      primary_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
      secundary_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
      header_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
      footer_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
      button_background_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
      button_text_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^#[0-9A-Fa-f]+$/, // Expresión regular para validar un número hexadecimal con "#" al inicio
        },
      },
    },

    {
      timestamps: false,
    }
  );
};
