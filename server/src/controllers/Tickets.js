const { Tickets, People, Events } = require("../db");

const regTicket = async (req, res) => {
  try {
    const {
      id_ticket,
      id_event,
      vendedor,
      state_ticket,
      person_id,
      name,
      genre,
      church,
    } = req.body;

    if (
      id_ticket &&
      id_event &&
      vendedor &&
      state_ticket &&
      person_id &&
      name &&
      genre &&
      church
    ) {
      console.log("Recibidos todos los datos");

      const evento = await Events.findByPk(Number(id_event));
      if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      const totalTicketsEvento = evento.num_tickets;
      const existingTicket = await Tickets.findOne({
        where: { id_ticket, id_event },
      });

      if (existingTicket) {
        return res.status(500).json({ error: "El ticket ya existe" });
      }

      if (id_ticket > totalTicketsEvento) {
        return res.status(500).json({ error: "Este evento está cerrado" });
      }

      const salePerson = vendedor.toUpperCase();
      const formattedBirthDate = `20${person_id.substring(
        7,
        9
      )}-${person_id.substring(5, 7)}-${person_id.substring(3, 5)}`;

      let person = await People.findByPk(person_id);
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
        id_event,
        vendedor: salePerson,
        state_ticket,
        PersonId: person_id,
        EventIdEvent: id_event,
      });

      if (id_ticket == totalTicketsEvento) {
        await Event.update({ event_state: "finalizado" });
      }

      return res
        .status(201)
        .json({ message: "Ticket creado exitosamente", ticket, person });
    } else {
      return res.status(500).json({ error: "Faltan datos" });
    }
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = regTicket;
