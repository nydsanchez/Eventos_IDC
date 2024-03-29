const router = require("express").Router();

const postEvento = require("../controllers/regEvento");
const regTicket = require("../controllers/regTickets");
const regChurch = require("../controllers/regChurch");

router.post("/evento", postEvento);
router.post("/tickets", regTicket);
router.post("/congregaciones", regChurch);

module.exports = router;
