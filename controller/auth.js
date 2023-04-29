const { response, json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      // Si no existe ningun usuario con ese correo, lo creamos.
      const data = {
        name,
        email,
        password: ":D",
        img,
        role: "USER_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario esta activo en la DB
    if (!user.status) {
      return res.status(401).json({
        msg: "Talk to administrator, user blocked",
      });
    }

    // Generamos el JwT
    const token = await generateJwT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "The token could not be verified",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
