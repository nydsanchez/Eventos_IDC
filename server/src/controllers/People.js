const { People } = require("../db");
const moment = require("moment");

const postPeople = async (req, res) => {
  try {
    const { person_id, name, state, address, phone, genre, ChurchId } =
      req.body;

    if (!(person_id && name && genre && ChurchId)) {
      return res.status(400).json({ error: "faltan datos" });
    }

    const formattedBirthDate = `20${person_id.substring(
      4,
      6
    )}-${person_id.substring(6, 8)}-${person_id.substring(8, 10)}`;
    const birthDate = moment(formattedBirthDate, "DD-MM-YY");
    if (!birthDate.isValid()) {
      throw new Error("Fecha de nacimiento invalida");
    }

    const isoBirthDate = birthDate.format("YYYY-MM-DD");

    let person = await People.findByPk(person_id);

    if (!person) {
      person = await People.create({
        cedula: person_id,
        name,
        state,
        address,
        phone,
        genre,
        ChurchId: Number(ChurchId),
        dob: isoBirthDate,
      });
    } else {
      return res.status(409).json({ error: "La persona ya existe" });
    }

    return res.status(201).json(person);
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
    console.error("Error al obtener la lista de las personas", error);
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
  const { name, state, address, phone, genre, dob, churchId } = req.body;
  try {
    const person = await People.findByPk(id);
    if (!person) {
      return res
        .status(404)
        .send({ message: "Esta persona no esta registrada" });
    }

    const updatedData = {};

    if (id && id !== person.id) {
      updatedData.id = id;
    }

    if (name && name !== person.name) {
      updatedData.name = name;
    }

    if (state && state !== person.state) {
      updatedData.state = state;
    }

    if (address && address !== person.address) {
      updatedData.address = address;
    }

    if (phone && phone !== person.phone) {
      updatedData.phone = phone;
    }
    if (genre && genre !== person.genre) {
      updatedData.genre = genre;
    }

    if (dob && dob !== person.dob) {
      updatedData.dob = dob;
    }

    if (churchId && churchId !== person.ChurchId) {
      updatedData.churchId = churchId;
    }

    await person.save(updatedData);

    return res.status(200).json(person);
  } catch (error) {
    console.error("Error al modificar los datos de la persona:", error);
    return res.status(500).send("Error interno del servidor");
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
