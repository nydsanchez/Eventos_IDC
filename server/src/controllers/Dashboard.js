const { Attendances, Tickets, People, Churches } = require("../db");

const getAttendanceSummary = async (req, res) => {
  try {
    // Calcular resúmenes de asistencia

    const totalAsistentes = await Attendances.count();

    const generoCounts = await Attendances.findAll({
      attributes: [
        "gender",
        [
          sequelize.fn("COUNT", sequelize.literal("DISTINCT person_id")),
          "count",
        ],
      ],
      include: [
        {
          model: Tickets,
          include: [
            {
              model: People,
              attributes: [],
            },
          ],
        },
      ],
      group: ["gender"],
    });

    const iglesiasRepresentadas = await Attendances.count({
      attributes: [
        [
          sequelize.fn("COUNT", sequelize.literal("DISTINCT church_id")),
          "count",
        ],
      ],
      include: [
        {
          model: Tickets,
          include: [
            {
              model: People,
              attributes: [],
            },
          ],
        },
      ],
    });

    const departamentosRepresentados = await Attendances.count({
      attributes: [
        [
          sequelize.fn("COUNT", sequelize.literal("DISTINCT department")),
          "count",
        ],
      ],
      include: [
        {
          model: Tickets,
          include: [
            {
              model: People,
              attributes: [],
            },
          ],
        },
      ],
    });

    // Devolver resúmenes de asistencia
    return res.status(200).json({
      totalAsistentes,
      generoCounts,
      iglesiasRepresentadas,
      departamentosRepresentados,
    });
  } catch (error) {
    console.error("Error al obtener los resúmenes de asistencia:", error);
    return res.status(500).json({
      error:
        "Error interno del servidor al obtener los resúmenes de asistencia",
    });
  }
};

module.exports = getAttendanceSummary;
