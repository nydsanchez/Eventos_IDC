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

module.exports = getEvents;
