const router = require("express").Router();

const regTicket = require("../controllers/Tickets");
const { getChurches, postChurch } = require("../controllers/Church");
const {
  getAllEvents,
  postEvento,
  getEvent,
  editEvent,
  deleteEvent,
} = require("../controllers/Evento");
const postPeople = require("../controllers/People");

//Gestión de Eventos
router.post("/eventos", postEvento);
router.get("/eventos", getAllEvents);
router.get("/eventos/:id", getEvent);
router.put("/eventos/:id", editEvent);
router.delete("/eventos/:id", deleteEvent);

//Gestión de Tickets
router.post("/eventos/:eventId/tickets", regTicket);
/*router.get("/eventos/:eventId/tickets", fn);
router.get("/tickets/:eventId/:idTicket", fn);
router.put("/tickets/:eventId/:idTicket", fn);
router.delete("/tickets/:eventId/:idTicket", fn);*/

//Gestión de Iglesias
router.post("/churches", postChurch);
router.get("/churches", getChurches);
/*router.get("/churches/:id", getChurches);
router.put("/churches/:id", getChurches);
router.delete("/churches/:id", getChurches);*/

//Gestión de Personas
router.post("/people", postPeople);
/* router.get("/people", getPeople);
router.get("/people/:id", getPeople);
router.put("/people/:id", getPeople);
router.delete("/people/:id", getPeople); */

//Registro y Verificación de Asistencia
//router.post("/tickets/:eventId/attend", fn); //Marcar asistencia para un ticket usando el número del ticket (desde la pistola lectora de código de barras).
//router.get("/eventos/:eventId/attendance", fn); //Listar todos los registros de asistencia de un evento específico.

//Rifas en Eventos
//router.get("/eventos/{eventId}/raffle", fn);

/* DASHBOARD DE UN EVENTO
router.get("events/:eventId/dashboard", fn) 
*/

module.exports = router;
