const { Router } = require("express");
const router = Router();
const {
  obtener,
  suma,
  obtenerusuario,
  modificarusuario,
} = require("../controllers");
//CRUDE
router.get("/api/", obtener);
router.get("/api/suma", suma);
router.get("/api/usuario/:name", obtenerusuario);
router.put("/api/body", modificarusuario);

module.exports = router;
