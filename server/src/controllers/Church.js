const { Church } = require("../db");

const postChurch = async (req, res) => {
  try {
    const { name, state, address, phone } = req.body;
    if (name && state && address && phone) {
      const [church, created] = await Church.findOrCreate({
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

      return res.status(200).json(church);
    }
    return res.status(400).send("Faltan datos");
  } catch (error) {
    console.error("Error al registrar la iglesia:", error);
    return res.status(500).send("Error interno del servidor");
  }
};
module.exports = postChurch;
