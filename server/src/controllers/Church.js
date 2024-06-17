const { Churches } = require("../db");

const getAllChurches = async (req, res) => {
  try {
    const count = await Churches.count();
    if (count !== 0) {
      const allChurches = await Churches.findAll();

      return res.status(200).json(allChurches);
    } else {
      return res
        .status(400)
        .json({ message: "no se ha registrado ninguna congregacion" });
    }
  } catch (error) {
    console.error("Error al obtener las iglesias", error);
    return res.status(500).send(error.message);
  }
};

const postChurch = async (req, res) => {
  try {
    const { name, state, address, phone } = req.body;
    if (!(name && state && address && phone)) {
      return res
        .status(400)
        .send(
          "Faltan datos: se requiere nombre, departamento, direccion y telefono"
        );
    }

    const [church, created] = await Churches.findOrCreate({
      where: {
        church_name: name,
        church_state: state,
      },
      defaults: {
        church_name: name,
        church_state: state,
        church_address: address,
        church_phone: phone,
      },
    });
    if (created) {
      return res.status(201).json(church);
    } else {
      return res.status(200).json(church);
    }
  } catch (error) {
    console.error("Error al registrar la iglesia:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

const getChurch = async (req, res) => {
  try {
    const { id } = req.params;
    const detailChurch = await Churches.findByPk(id);

    if (detailChurch) {
      return res.status(200).json(detailChurch);
    } else {
      return res.status(400).json({
        message: "no se han registrado ningun congregacion con ese id",
      });
    }
  } catch (error) {
    console.error("Error al registrar la iglesia:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

const editChurch = async (req, res) => {
  const { id } = req.params;
  const { name, state, address, phone } = req.body;

  try {
    const church = await Churches.findByPk(id);

    if (!church) {
      return res.status(404).send({ message: "Congregacion no encontrada" });
    }

    const updatedData = {};

    if (name && name !== church.church_name) {
      updatedData.church_name = name;
    }

    if (state && state !== church.church_state) {
      updatedData.church_state = state;
    }

    if (address && address !== church.church_address) {
      updatedData.church_address = address;
    }

    if (phone && phone !== church.church_phone) {
      updatedData.church_phone = phone;
    }

    await church.update(updatedData);

    return res.status(200).json(church);
  } catch (error) {
    console.error("Error al modificar los datos de la congregacion:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

const deleteChurch = async (req, res) => {
  try {
    const { id } = req.params;
    const churchDeleted = await Churches.findByPk(id);

    if (!churchDeleted) {
      return res.status(404).send({ message: "Congregacion no encontrada" });
    }
    await churchDeleted.destroy();

    return res.status(200).send({ message: "Congregación eliminada" });
  } catch (error) {
    return res.status(500).send({
      message: "Error al eliminar la congregacion",
      error: error.message,
    });
  }
};
module.exports = {
  getAllChurches,
  postChurch,
  getChurch,
  editChurch,
  deleteChurch,
};
