const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJwT, isAdminRole } = require("../middlewares");

const {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller");

const { existProductById, existCategorieId } = require("../helpers");

const router = Router();

// GET Products
router.get("/", getProducts);

// GET Product by id
router.get(
  "/:id",
  [
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existProductById),
    validateFields,
  ],
  getProductById
);

// POST Product
router.post(
  "/",
  [
    validateJwT,
    check("name", "Name is required").not().isEmpty(),
    check("categorie", "Not a valid id").isMongoId(),
    check("categorie").custom(existCategorieId),
    validateFields,
  ],
  postProduct
);

// PUT Prodcut
router.put(
  "/:id",
  [
    validateJwT,
    check("name", "Name is required").not().isEmpty(),
    check("id").custom(existProductById),
    validateFields,
  ],
  putProduct
);

// DELETE Product
router.delete(
  "/:id",
  [
    validateJwT,
    isAdminRole,
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existProductById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
