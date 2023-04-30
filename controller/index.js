const { login, googleSignIn } = require("../controller/auth.js");

const {
  getCategories,
  getCategoriesById,
  postCategorie,
  putCategorie,
  deleteCategorie,
} = require("../controller/categories.js");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controller/user.js");

module.exports = {
  login,
  googleSignIn,
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getCategories,
  getCategoriesById,
  postCategorie,
  putCategorie,
  deleteCategorie,
};
