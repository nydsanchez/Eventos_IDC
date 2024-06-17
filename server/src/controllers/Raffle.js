const { Attendances, Tickets, People, Churches } = require("../db");

const drawRaffle = async (req, res) => {
  try {
    // Obtener el total de asistentes
    const totalAsistentes = await Attendances.count();

    // Verificar si hay suficientes asistentes para realizar la rifa
    if (totalAsistentes < 3) {
      return res.status(400).json({
        error: "No hay suficientes asistentes para realizar la rifa",
      });
    }

    // Obtener 3 registros aleatorios de la tabla Attendances
    const randomAttendances = await Attendances.findAll({
      order: sequelize.random(), // Obtener registros aleatorios
      limit: 3, // Obtener solo 3 registros
      include: [
        {
          model: Tickets,
          include: [
            {
              model: People,
              include: [
                {
                  model: Churches,
                  attributes: ["church_name"],
                },
              ],
            },
          ],
        },
      ],
    });

    // Preparar los resultados de la rifa
    const raffleResults = randomAttendances.map((attendance) => ({
      ticketId: attendance.ticketIdTicket,
      winnerName: attendance.Ticket.Person.name,
      church: attendance.Ticket.Person.Church.church_name,
    }));

    // Devolver los resultados de la rifa
    return res.status(200).json(raffleResults);
  } catch (error) {
    console.error("Error al realizar la rifa:", error);
    return res.status(500).json({
      error: "Error interno del servidor al realizar la rifa",
    });
  }
};

module.exports = drawRaffle;
