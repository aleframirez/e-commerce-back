const { validateFields } = require("../middlewares/validate-fields.js");
const { validateJwT } = require("../middlewares/validate-jwt.js");
const { isAdminRole, haveRole } = require("../middlewares/validate-roles.js");

module.exports = {
  validateFields,
  validateJwT,
  isAdminRole,
  haveRole,
};
