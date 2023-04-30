const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: "GET /api/users - Controller",
    total,
    users,
  });
};

const postUsers = async (req, res = response) => {
  // We get the data we want
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encrypt the password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Save in the DB
  await user.save();

  res.status(201).json({
    msg: "POST /api/users - Controller",
    user,
  });
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...remainder } = req.body;

  // Validate against db
  if (password) {
    const salt = bcrypt.genSaltSync();
    remainder.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, remainder);

  res.status(200).json({
    msg: "PUT /api/users - Controller",
    user,
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.status(200).json({
    msg: "DELETE /api/users - Controller",
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
