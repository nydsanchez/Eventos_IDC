const { Tickets, People, Events } = require("../db");

const regTicket = async (req, res) => {
  const { eventId } = req.params;

  try {
    const {
      id_ticket,
      vendedor,
      state_ticket,
      person_id,
      name,
      genre,
      church,
    } = req.body;

    if (
      id_ticket &&
      vendedor &&
      state_ticket &&
      person_id &&
      name &&
      genre &&
      church
    ) {
      const evento = await Events.findByPk(Number(eventId));

      const totalTicketsEvento = evento.num_tickets;
      const existingTicket = await Tickets.findOne({
        where: { id_ticket, eventId },
      });

      if (existingTicket) {
        return res.status(500).json({ error: "El ticket ya existe" });
      }

      const salePerson = vendedor.toUpperCase();
      const formattedBirthDate = `20${person_id.substring(
        7,
        9
      )}-${person_id.substring(5, 7)}-${person_id.substring(3, 5)}`;

      const person = await People.findByPk(person_id);
      if (!person) {
        person = await People.create({
          id: person_id,
          name,
          genre,
          church,
          dob: formattedBirthDate,
        });
      }

      const ticket = await Tickets.create({
        id_ticket,
        id_event: eventId,
        vendedor: salePerson,
        state_ticket,
        PersonId: person_id,
        EventIdEvent: eventId,
      });

      return res
        .status(201)
        .json({ message: "Ticket creado exitosamente", ticket });
    } else {
      return res.status(500).json({ error: "Faltan datos" });
    }
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = regTicket;
