const { Event } = require("../db");

const getEvents = async (req, res) => {
  try {
    const count = await Event.count();
    if (count !== 0) {
      const allEvents = await Event.findAll();
      console.log(allEvents);
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
    const { name, event_type, description, start_date, end_date, tickets } =
      req.body;

    if (
      name &&
      event_type &&
      description &&
      start_date &&
      end_date &&
      tickets
    ) {
      const existingEvent = await Event.findOne({
        where: {
          event_name: name,
          start_date,
          end_date,
        },
      });

      if (existingEvent) {
        return res.status(400).send("¡Este evento ya está registrado!");
      } else {
        // Si no existe un evento con los mismos detalles, crear un nuevo registro
        if (start_date <= end_date && tickets > 0) {
          const newEvent = await Event.create({
            event_name: name,
            event_type,
            event_desc: description,
            start_date,
            end_date,
            num_tickets: tickets,
          });

          // Devolver solo el nuevo evento agregado
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

module.exports = { getEvents, postEvento };
