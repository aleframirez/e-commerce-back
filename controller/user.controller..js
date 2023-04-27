const { response } = require("express");

const getUsers = (req, res = response) => {
  res.status(200).json({
    msg: "get /api/users - Controller",
  });
};

const postUsers = (req, res = response) => {

   const body = req.body;

  res.status(201).json({
    msg: "post /api/users - Controller",
    body
  });
};

const putUsers = (req, res = response) => {
  res.status(200).json({
    msg: "put /api/users - Controller",
  });
};

const deleteUsers = (req, res = response) => {
  res.status(200).json({
    msg: "delete /api/users - Controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
};
