const router = require("express").Router();

const regTicket = require("../controllers/Tickets");
const { getChurches, postChurch } = require("../controllers/Church");
const { getEvents, postEvento } = require("../controllers/Evento");
const postPeople = require("../controllers/People");

router.post("/eventos", postEvento);
router.post("/tickets", regTicket);
router.post("/churches", postChurch);
router.post("/people", postPeople);
router.get("/eventos", getEvents);
router.get("/churches", getChurches);

module.exports = router;
