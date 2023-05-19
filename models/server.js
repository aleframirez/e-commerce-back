const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/users",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
    };

    // Conect to DB
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  // Middlewares.
  middlewares() {
    // Cors
    this.app.use(cors());

    // Reading and parsing the body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));

    // FileUpload - Load file
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  // Routes
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes.js"));
    this.app.use(
      this.paths.categories,
      require("../routes/categories.routes.js")
    );
    this.app.use(this.paths.users, require("../routes/user.routes.js"));
    this.app.use(this.paths.products, require("../routes/products.routes.js"));
    this.app.use(this.paths.search, require("../routes/search.routes.js"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
