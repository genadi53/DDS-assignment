const express = require("express");
const router = express.Router();

router.post("/checkout", (req, res) => {
  res.send("/checkout");
});

module.exports = router;
