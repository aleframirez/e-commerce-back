const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users',
    }

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require("../routes/auth.routes.js"));
    this.app.use(this.paths.categories, require("../routes/categories.routes.js"));
    this.app.use(this.paths.users, require("../routes/user.routes.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
