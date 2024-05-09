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

const getAllPeople = async (req, res) => {
  try {
    const countPeople = await People.count();
    if (countPeople !== 0) {
      const allPeople = await People.findAll();
      return res.status(200).json(allPeople);
    } else {
      return res.status(400).json({
        message: "no se han registrado ninguna persona en la base de datos",
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPerson = await People.findByPk(id);

    if (detailPerson) {
      return res.status(200).json(detailPerson);
    } else {
      res.status(404).json({
        message: "no se han registrado ninguna persona con esa identificacion",
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const editPerson = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, genre, dob, churchId } = req.body;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res
        .status(404)
        .send({ message: "Esta persona no esta registrada" });
    }

    person.id = id;
    person.name = name;
    person.address = address;
    person.phone = phone;
    person.genre = genre;
    person.dob = dob;
    person.ChurchId = churchId;

    if (person.changed()) {
      const updatedPerson = await person.save();
      return res.status(200).json(updatedPerson);
    } else {
      return res.status(200).json({
        message: "No hubo cambios para actualizar los datos de la persona",
      });
    }
  } catch (error) {
    console.error("Error al modificar los datos de la persona:", error);
    return res
      .status(500)
      .send({ message: "Error interno del servidor", error: error.message });
  }
};
const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res
        .status(404)
        .send({ message: "No se ha registrado esta identificación" });
    }

    await person.destroy();
    return res
      .status(200)
      .send({ message: "Persona eliminada de la base de datos" });
  } catch (error) {
    return res.status(500).send({
      message: "Error al eliminar a la persona",
      error: error.message,
    });
  }
};

module.exports = {
  postPeople,
  getAllPeople,
  getPerson,
  editPerson,
  deletePerson,
};
