const router = require("express").Router();

const {
  regTicket,
  getTickets,
  updateTicket,
  voidTicket,
} = require("../controllers/Tickets");

const {
  getAllChurches,
  postChurch,
  getChurch,
  editChurch,
  deleteChurch,
} = require("../controllers/Church");

const {
  postPeople,
  getAllPeople,
  getPerson,
  editPerson,
  deletePerson,
} = require("../controllers/People");

//Gestión de Iglesias
router.post("/churches", postChurch);
router.get("/churches", getAllChurches);
router.get("/churches/:id", getChurch);
router.put("/churches/:id", editChurch);
router.delete("/churches/:id", deleteChurch);

//Gestión de Personas
router.post("/people", postPeople);
router.get("/people", getAllPeople);
router.put("/people/:id", editPerson);
router.get("/people/:id", getPerson);
router.delete("/people/:id", deletePerson);

//Gestión de Tickets
router.post("/tickets", regTicket);
router.get("/tickets", getTickets);
router.put("/tickets/:id", updateTicket);
router.put("/tickets/:id/anular", voidTicket);

module.exports = router;
