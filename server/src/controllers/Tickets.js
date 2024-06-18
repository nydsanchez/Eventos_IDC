const { Op } = require("sequelize");
const { Tickets } = require("../db");

const regTicket = async (req, res) => {
  try {
    const { no_ticket, state_ticket, personCedula } = req.body;

    if (!(no_ticket && state_ticket && personCedula)) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    console.log(personCedula);
    let ticket = await Tickets.findByPk(no_ticket);
    if (!ticket) {
      ticket = await Tickets.create({
        no_ticket,
        state_ticket,
        PersonCedula: personCedula,
      });
    }
    return res
      .status(201)
      .json({ message: "Ticket creado exitosamente", ticket });
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getTickets = async (req, res) => {
  try {
    const count = await Tickets.count();

    if (count > 0) {
      const allTickets = await Tickets.findAll({
        where: {
          state_ticket: {
            [Op.ne]: "anulado",
          },
        },
      });
      return res.status(200).json(allTickets);
    } else {
      return res
        .status(404)
        .json({ message: "No se ha registrado ningún ticket" });
    }
  } catch (error) {
    console.error("Error al obtener la lista de los tickets:", error);
    return res
      .status(500)
      .send("Error interno del servidor al obtener los tickets");
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { state_ticket, personCedula } = req.body;

    if (!state_ticket && !personCedula) {
      return res
        .status(400)
        .send(
          "No se proporcionaron datos válidos para modificar los datos del ticket."
        );
    }

    const ticket = await Tickets.findByPk(id);

    if (!ticket) {
      return res.status(404).send("No se ha registrado este ticket.");
    }

    const updatedData = {};

    // Actualizar solo los campos modificados
    if (state_ticket && state_ticket !== ticket.state_ticket) {
      updatedData.state_ticket = state_ticket;
    }

    if (personCedula && personCedula !== ticket.personCedula) {
      updatedData.personCedula = personCedula;
    }

    await ticket.update(updatedData);

    return res.status(200).json(ticket);
  } catch (error) {
    console.error("Error al actualizar los datos del ticket:", error);
    return res
      .status(500)
      .send("Error interno del servidor al actualizar los datos del ticket.");
  }
};

const voidTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Tickets.findByPk(ticketId);

    if (ticket) {
      ticket.state_ticket = "anulado";
      await ticket.save();
      res.status(200).json({ message: "Ticket anulado" });
    } else {
      res.status(404).json({ error: "Ticket no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { regTicket, getTickets, updateTicket, voidTicket };
