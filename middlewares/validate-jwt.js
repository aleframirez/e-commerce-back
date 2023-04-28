const JwT = require("jsonwebtoken");
const { User } = require("../models");

const validateJwT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = JwT.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    // Verificamos si el usuario existe en la DB
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - User does not exist en DB",
      });
    }

    // Verificamos si el uid tiene el status en true
    if (!user.status) {
      return res.status(401).json({
        msg: "Invalid token - User status: false",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJwT,
};
