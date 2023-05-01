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

const {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/products.js");

const {
  searchUser,
  searchCategories,
  searchProducts,
  search,
} = require("../controller/search.js");

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
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
  searchUser,
  searchCategories,
  searchProducts,
  search,
};
