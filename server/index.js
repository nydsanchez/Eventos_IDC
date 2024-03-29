const server = require("./src/app.js");

const { conn } = require("./src/db.js");
const PORT = 4000;

conn
  .sync({ force: false }) //retorna una promesa
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server raised in port: ", PORT);
    });
  })
  .catch(function (error) {
    console.log(error.message);
  });
