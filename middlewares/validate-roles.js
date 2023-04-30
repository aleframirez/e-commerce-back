const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You must validate the token before you can validate the role",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an Admin - Not allowed to do this`,
    });
  }

  next();
};

const haveRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "You must validate the token before you can validate the role",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of this roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  haveRole,
};
