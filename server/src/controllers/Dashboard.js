const { Tickets, People } = require("../db");

const getAttendanceSummary = async (req, res) => {
  try {
    // Total de personas que asistieron
    const totalAsistentes = await Tickets.count({
      where: { state_ticket: "utilizado" },
    });

    // Total de mujeres y hombres que asistieron
    const generoCounts = await People.findAll({
      attributes: [
        "genre",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      include: {
        model: Tickets,
        where: { state_ticket: "utilizado" },
        attributes: [],
      },
      group: ["genre"],
    });

    // Total por estado del país
    const estadosRepresentados = await People.findAll({
      attributes: [
        "state",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      include: {
        model: Tickets,
        where: { state_ticket: "utilizado" },
        attributes: [],
      },
      group: ["state"],
    });

    // Total de asistentes por iglesia
    const iglesiasRepresentadas = await People.findAll({
      attributes: [
        "churchId",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      include: {
        model: Tickets,
        where: { state_ticket: "utilizado" },
        attributes: [],
      },
      group: ["churchId"],
    });

    // Contar el total de iglesias representadas (Número único de iglesias)
    const totalIglesiasRepresentadas = await People.count({
      include: {
        model: Tickets,
        where: { state_ticket: "utilizado" },
        attributes: [],
      },
      attributes: ["churchId"],
      group: ["churchId"],
      distinct: true,
    });

    // Formatear la respuesta
    const result = {
      totalAsistentes,
      generoCounts: generoCounts.map((g) => ({
        genre: g.genre,
        count: g.dataValues.count,
      })),
      estadosRepresentados: estadosRepresentados.map((e) => ({
        state: e.state,
        count: e.dataValues.count,
      })),
      iglesiasRepresentadas: iglesiasRepresentadas.map((i) => ({
        churchId: i.churchId,
        count: i.dataValues.count,
      })),
      totalIglesiasRepresentadas,
    };

    // Devolver el resumen de asistencia
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener los resúmenes de asistencia:", error);
    return res.status(500).json({
      error:
        "Error interno del servidor al obtener los resúmenes de asistencia",
    });
  }
};

module.exports = getAttendanceSummary;
