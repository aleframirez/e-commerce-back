const { validateFields } = require("../middlewares/validate-fields.js");
const { validateJwT } = require("../middlewares/validate-jwt.js");
const { isAdminRole, haveRole } = require("../middlewares/validate-roles.js");
const { uploadFileValidator } = require("../middlewares/validate-file.js");

module.exports = {
  validateFields,
  validateJwT,
  isAdminRole,
  haveRole,
  uploadFileValidator,
};
