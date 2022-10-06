const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../middlewares");
const {
  getProducts,
  createProduct,
  getProduct,
  modifyProduct,
  deleteProduct,
  createUser,
  getUsers,
  getUser,
  modifyUser,
  deleteUser,
  createInvoice,
  getInvoices,
  getInvoice,
  modifyInvoice,
  deleteInvoice,
  loginController,
} = require("../controllers");

//CRUD  PRODUCTS
router.post("/api/v1/product", createProduct);
router.get("/api/v1/products", getProducts);
router.get("/api/v1/product/:idProduct", getProduct);
router.put("/api/v1/product/:idProduct", modifyProduct);
router.delete("/api/v1/product/:idProduct", deleteProduct);

//CRUD  USERS
router.post("/api/v1/user", createUser);
router.get("/api/v1/users", getUsers);
router.get("/api/v1/user/:idUser", getUser);
router.put("/api/v1/user/:idUser", modifyUser);
router.delete("/api/v1/user/:idUser", deleteUser);

//CRUD  INVOICES
router.post("/api/v1/invoice", createInvoice);
router.get("/api/v1/invoices", getInvoices);
router.get("/api/v1/invoice/:idInvoice", getInvoice);
router.put("/api/v1/invoice/:idInvoice", modifyInvoice);
router.delete("/api/v1/invoice/:idInvoice", deleteInvoice);

//LOGIN
router.post("/login", loginController);

module.exports = router;
