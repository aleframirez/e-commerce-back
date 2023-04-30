const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateFields,
  validateJwT,
  isAdminRole,
  haveRole,
} = require("../middlewares");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controller/user.js");

const {
  validEmail,
  validRole,
  existUserId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "The password must contain at least 6 letters").isLength({
      min: 6,
    }),
    check("email", "Invalid email").isEmail(),
    check("email").custom(validEmail),
    check("role").custom(validRole),
    validateFields,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "Not a valid id").isMongoId(),
    check("id", existUserId),
    check("role", validRole),
    validateFields,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validateJwT,
    isAdminRole, // It forces you to be an administrator.
    haveRole("ADMIN_ROLE"), // It can be any of the roles that we give here.
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existUserId),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;
