const { Events } = require("../db");

const getAllEvents = async (req, res) => {
  try {
    const count = await Events.count();
    if (count !== 0) {
      const allEvents = await Events.findAll();
      return res.status(200).json(allEvents);
    } else {
      return res
        .status(400)
        .json({ message: "no se han registrado ningun evento" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const postEvento = async (req, res) => {
  try {
    const {
      event_name,
      event_type,
      description,
      start_date,
      end_date,
      tickets,
    } = req.body;

    if (
      event_name &&
      event_type &&
      description &&
      start_date &&
      end_date &&
      tickets
    ) {
      const existingEvent = await Events.findOne({
        where: {
          event_name,
          start_date,
          end_date,
        },
      });

      if (existingEvent) {
        return res.status(400).send("¡Este evento ya está registrado!");
      } else {
        // Si no existe un evento con los mismos detalles, crear un nuevo registro
        if (start_date <= end_date && tickets > 0) {
          const newEvent = await Events.create({
            event_name,
            event_type,
            event_desc: description,
            start_date,
            end_date,
            num_tickets: tickets,
          });

          return res.status(200).json(newEvent);
        } else {
          return res
            .status(400)
            .send(
              "La fecha de inicio no puede ser mayor que la fecha de finalizacion"
            );
        }
      }
    } else {
      // Si falta algún dato necesario, enviar un mensaje de error
      return res.status(400).send("Faltan datos");
    }
  } catch (error) {
    // Manejar errores internos del servidor
    return res.status(500).send(error.message);
  }
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const detailEvent = await Events.findByPk(id);

    if (detailEvent) {
      return res.status(200).json(detailEvent);
    } else {
      res
        .status(404)
        .json({ message: "no se han registrado ningun evento con ese id" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editEvent = async (req, res) => {
  const { id } = req.params;
  const {
    event_name,
    event_type,
    description,
    start_date,
    end_date,
    num_tickets,
    event_state,
  } = req.body;

  try {
    const event = await Events.findByPk(id);
    if (!event) {
      return res.status(404).send({ message: "Evento no encontrado" });
    }

    (event.event_name = event_name),
      (event.event_type = event_type),
      (event.event_desc = description),
      (event.start_date = start_date);
    event.end_date = end_date;
    event.num_tickets = num_tickets;
    event.event_state = event_state;

    if (event.changed()) {
      const updatedEvent = await event.save();
      return res.status(200).json(updatedEvent);
    } else {
      return res.status(200).json({
        message: "No hubo cambios para actualizar los datos del evento",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al actualizar el evento", error: error.message });
  }
};
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Events.findByPk(id);
    if (!event) {
      return res.status(404).send({ message: "Evento no encontrado" });
    }

    await event.destroy();
    return res.status(200).send({ message: "Evento eliminado" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error al eliminar el evento", error: error.message });
  }
};

module.exports = { getAllEvents, postEvento, getEvent, editEvent, deleteEvent };
