const { User, Categorie, Product } = require("../models");
const Role = require("../models/role");

// Check if the email exist
const validEmail = async (email = "") => {
  const existantEmail = await User.findOne({ email });

  if (existantEmail) {
    throw new Error(`Email: ${email}, is already in use.`);
  }
};

// Check if the Role exist
const validRole = async (role = "") => {
  const existantRole = await Role.findOne({ role });

  if (!existantRole) {
    throw new Error(`Role: ${role}, is not registered in de database`);
  }
};

// Check if the User exist
const existUserId = async (id) => {
  const existUserId = await User.findById(id);
  if (!existUserId) {
    throw new Error("The ID does not exist");
  }
};

// Check if the Categorie exist
const existCategorieId = async (id) => {
  const existCategorieId = await Categorie.findById(id);
  if (!existCategorieId) {
    throw new Error("The ID does not exist");
  }
};

// Check if the Product exist
const existProductById = async (id) => {
  const existProductById = await Product.findById(id);

  if (!existProductById) {
    throw new Error("The id does not exist");
  }
};

module.exports = {
  validEmail,
  validRole,
  existUserId,
  existCategorieId,
  existProductById,
};
