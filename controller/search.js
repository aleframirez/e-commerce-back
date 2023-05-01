const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Categorie, Product } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUser = async (term = "", res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const user = await User.findById(term);
    return res.status(200).json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.status(200).json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const categorie = await Categorie.findById(term);
    return res.json({
      results: categorie ? [categorie] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categories = await Categorie.find({ name: regex, status: true });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const product = await Product.findById(term).populate("categorie", "name");
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const products = await Product.find({ name: regex, status: true }).populate(
    "categorie",
    "name"
  );

  res.json({
    results: products,
  });
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed collections are: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUser(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        msg: "Forgot to do this search",
      });
  }
};

module.exports = {
  searchUser,
  searchCategories,
  searchProducts,
  search,
};
