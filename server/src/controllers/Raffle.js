const { Tickets, People } = require("../db");

const drawRaffle = async (req, res) => {
  try {
    // Obtener 3 registros aleatorios de la tabla Tickets
    const randomTickets = await Tickets.findAll({
      where: {
        state_ticket: "utilizado",
      },
      order: sequelize.random(), // Obtener registros aleatorios
      limit: 3, // Obtener solo 3 registros
      include: [
        {
          model: People,
          attributes: ["name"], // Incluir solo el nombre de la persona
        },
      ],
    });

    // Si no hay tickets, devolver una respuesta adecuada
    if (randomTickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron tickets utilizados." });
    }

    // Devolver los resultados de la rifa
    return res.status(200).json(randomTickets);
  } catch (error) {
    console.error("Error al realizar la rifa:", error);
    return res.status(500).json({
      error: "Error interno del servidor al realizar la rifa",
    });
  }
};

module.exports = drawRaffle;
