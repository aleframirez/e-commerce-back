const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificamos si el corrreo existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password incorrect - email",
      });
    }

    // Si el usuario esta activo
    if (!user.status) {
      return res.status(400).json({
        msg: "User / Password incorrect - status: false",
      });
    }

    // Verificamos el password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password incorrect - Password",
      });
    }

    // Generar JwT
    const token = await generateJwT(user.id);

    res.json({
      msg: "Login Ok",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  login,
};
