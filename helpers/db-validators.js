const { User, Categorie } = require("../models");
const Role = require("../models/role");

const validEmail = async (email = "") => {
  const existantEmail = await User.findOne({ email });

  if (existantEmail) {
    throw new Error(`Email: ${email}, is already in use.`);
  }
};

const validRole = async (role = "") => {
  const existantRole = await Role.findOne({ role });

  if (!existantRole) {
    throw new Error(`Role: ${role}, is not registered in de database`);
  }
};

const existUserId = async (id) => {
  const existUserId = await User.findById(id);
  if (!existUserId) {
    throw new Error("The ID does not exist");
  }
};

const existCategorieId = async (id) => {
  const existCategorieId = await Categorie.findById(id);
  if (!existCategorieId) {
    throw new Error("The ID does not exist");
  }
};

module.exports = {
  validEmail,
  validRole,
  existUserId,
  existCategorieId,
};
