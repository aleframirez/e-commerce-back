const { request, response } = require("express");
const { Categorie } = require("../models");

const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Categorie.countDocuments({ status: true }),
    Categorie.find({ status: true })
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    msg: "GET /api/categories - Controller",
    total,
    categories,
  });
};

const getCategoriesById = async (req = request, res = response) => {
  const { id } = req.params;
  const categorie = await Categorie.findById(id).populate("user", "name");

  res.json(categorie);
};

const postCategorie = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  // Look for a category with the name that we pass to it and we assign it to categoriaDB
  const categorieDB = await Categorie.findOne({ name });

  // If the categorie already exist, send an error
  if (categorieDB) {
    return res.status(400).json({
      mag: `Categorie: ${categorieDB.name}, already exist`,
    });
  }

  // Generate the data to save
  const data = {
    name,
    user: req.user._id,
  };

  // Create a Categorie using the model
  const categorie = new Categorie(data);

  // Save in the DB
  await categorie.save();

  res.status(201).json(categorie);
};

const putCategorie = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id; // User that update the categorie

  const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });

  res.json({
    msg: "PUT /api/categories - Controller",
    categorie,
  });
};

const deleteCategorie = async (req = request, res = response) => {
  const { id } = req.params;

  const categorieDeleted = await Categorie.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(categorieDeleted);
};

module.exports = {
  getCategories,
  getCategoriesById,
  postCategorie,
  putCategorie,
  deleteCategorie,
};
