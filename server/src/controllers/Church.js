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
    return res.status(500).send(error.message);
  }
};

const postChurch = async (req, res) => {
  try {
    const { name, state, address, phone } = req.body;
    if (name && state && address && phone) {
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

      if (church) {
        return res.status(200).json(church);
      } else {
        return res.status(400).send("No se pudo crear la iglesia");
      }
    }
    return res.status(400).send("Faltan datos");
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
  try {
    const { id } = req.params;
    const churchEdit = await Churches.findByPk(id);

    if (!churchEdit) {
      return res.status(404).send({ message: "Congregacion no encontrada" });
    }
    const { name, state, address, phone } = req.body;

    const updatedChurch = await churchEdit.update({
      church_name: name,
      church_state: state,
      church_address: address,
      church_phone: phone,
    });

    return res.status(200).json(updatedChurch);
  } catch (error) {
    console.error("Error al registrar la iglesia:", error);
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
    return res
      .status(500)
      .send({
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
