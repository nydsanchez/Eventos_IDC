const { Attendances, Tickets, People, Churches } = require("../db");

const regAttendances = async (req, res) => {
  const { ticket_id } = req.body;

  if (!ticket_id) {
    return res.status(400).json({
      error: "Se requiere el número del ticket para registrar la asistencia",
    });
  }

  try {
    // Iniciar transacción
    const transaction = await sequelize.transaction();

    // Verificar si el ticket ya ha sido utilizado
    const existingAttendance = await Attendances.findOne({
      where: {
        ticketIdTicket: ticket_id,
      },
      transaction,
    });

    if (existingAttendance) {
      await transaction.rollback(); // Cancelar transacción
      return res.status(400).json({
        error: "Este ticket ya ha sido registrado",
      });
    }

    // Crear registro de asistencia
    const attendance = await Attendances.create(
      {
        ticketIdTicket: ticket_id,
        awarded: false,
      },
      { transaction }
    );

    // Actualizar estado del ticket a "utilizado"
    const ticket = await Tickets.findOne({
      where: {
        id_Ticket: ticket_id,
      },
      transaction,
    });
    await ticket.update(
      {
        state_ticket: "utilizado",
      },
      { transaction }
    );

    // Confirmar transacción
    await transaction.commit();

    return res.status(201).json(attendance);
  } catch (error) {
    console.error("Error al registrar la asistencia:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

const getAttendances = async (req, res) => {
  try {
    const attendances = await Attendances.findAll({
      include: [
        {
          model: Tickets,
          include: [
            {
              model: People,
              attributes: ["name", "state"], // Seleccionar 'name' y 'department'
              include: [
                {
                  model: Churches,
                  attributes: ["church_name"], // Seleccionar solo el campo 'church_name'
                },
              ],
            },
          ],
        },
      ],
    });

    if (attendances.length > 0) {
      return res.status(200).json(attendances);
    } else {
      return res
        .status(404)
        .json({ message: "No se ha registrado a ningún asistente" });
    }
  } catch (error) {
    console.error("Error al obtener la lista de los asistentes:", error);
    return res
      .status(500)
      .send("Error interno del servidor al obtener a los asistentes");
  }
};

module.exports = { regAttendances, getAttendances };
