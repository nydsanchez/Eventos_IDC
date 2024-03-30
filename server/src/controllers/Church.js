const { Churches } = require("../db");

const getChurches = async (req, res) => {
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
module.exports = { getChurches, postChurch };
