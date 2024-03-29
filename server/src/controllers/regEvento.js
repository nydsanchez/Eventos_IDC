const { Evento } = require("../db");

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
      const existingEvent = await Evento.findOne({
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
        const newEvent = await Evento.create({
          event_name: name,
          event_type,
          event_desc: description,
          start_date,
          end_date,
          num_tickets: tickets,
        });

        // Devolver solo el nuevo evento agregado
        return res.status(200).json(newEvent);
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

module.exports = postEvento;
