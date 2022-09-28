const { Router } = require("express");
const router = Router();

router.get("/users", function (req, res) {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
});

module.exports = router;
