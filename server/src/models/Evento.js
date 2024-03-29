const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Evento",
    {
      id_event: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty." },
          notNull: { msg: "Name is a required property." },
        },
      },

      event_type: {
        type: DataTypes.ENUM(
          "Conferencia",
          "Capacitación",
          "Retiro",
          "Culto Unido",
          "Convención",
          "Taller",
          "Confraternidad",
          "Otro"
        ),
        allowNull: false,
      },
      event_desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      num_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Este campo debe ser un número entero",
          },
        },
      },
      event_state: {
        type: DataTypes.ENUM("abierto", "finalizado"),
        defaultValue: "abierto",
      },
    },
    { timestamps: false }
  );
};
