const { Op } = require("sequelize");
const { Tickets } = require("../db");

const regTicket = async (req, res) => {
  try {
    const { no_ticket, state_ticket, personCedula } = req.body;

    if (!(no_ticket && state_ticket && personCedula)) {
      return res.status(400).json({ error: "Faltan datos" });
    }

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
      const allTickets = await Tickets.findAll();
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

    if (!personCedula) {
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

    if (personCedula && personCedula !== ticket.personCedula) {
      updatedData.personCedula = personCedula;
    }

    await ticket.save(updatedData);

    return res.status(200).json(ticket);
  } catch (error) {
    console.error("Error al actualizar los datos del ticket:", error);
    return res
      .status(500)
      .send("Error interno del servidor al actualizar los datos del ticket.");
  }
};

module.exports = { regTicket, getTickets, updateTicket };
