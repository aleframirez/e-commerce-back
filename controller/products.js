const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("categorie", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: "GET /api/products - Controller",
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("categorie", "name");

  // If the status is false, send an error.
  if (!product.status) {
    res.status(400).json({
      msg: "This product has been deleted.",
    });
  }

  res.status(200).json({
    msg: "GET/:id /api/products - Controller",
    product,
  });
};

const postProduct = async (req = request, res = response) => {
  const { status, user, ...body } = req.body;

  // Look for a category with the name that we pass to it and we assign it to categoriaDB
  const productDB = await Product.findOne({ name: body.name });

  // If the categorie already exist, send an error
  if (productDB) {
    return res.status(400).json({
      msg: `Product: ${productDB.name}, already exist`,
    });
  }

  // Generate the data to save
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  // Create a Product using the model
  const product = new Product(data);

  // Save in the DB
  await product.save();

  res.status(201).json({
    msg: "POST /api/products - Controller",
    product,
  });
};

const putProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id; // User that update the product

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "PUT /api/products - Controller",
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).json({
    msg: "DELETE /api/products - Controller",
    productDeleted,
  });
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
