const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  //     Middlewares.
  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  //     Rutas a utilizar.
  routes() {
    this.app.use(this.usersRoutePath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
