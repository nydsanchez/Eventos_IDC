const { People } = require("../db");

const postPeople = async (req, res) => {
  try {
    const { person_id, name, address, phone, genre, ChurchId } = req.body;

    if (person_id && name && address && phone && genre && ChurchId) {
      const formattedBirthDate = `20${person_id.substring(
        7,
        9
      )}-${person_id.substring(5, 7)}-${person_id.substring(3, 5)}`;

      let person = await People.findByPk(person_id);

      if (!person) {
        person = await People.create({
          id: person_id,
          name,
          address,
          phone,
          genre,
          ChurchId: Number(ChurchId),
          dob: formattedBirthDate,
        });
      }

      return res.status(201).json(person);
    } else {
      return res.status(400).json({ error: "Faltan datos" });
    }
  } catch (error) {
    console.error("Error al crear la persona:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = postPeople;
