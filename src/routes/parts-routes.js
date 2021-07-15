const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("/all parts");
});

router.post("/", (req, res) => {
  res.send("/add new part");
});

router.get("/:id", (req, res) => {
  res.send("/ show part:id");
});

// router.patch;
router.put("/:id", (req, res) => {
  res.send("/ update part:id");
});

router.delete("/:id", (req, res) => {
  res.send("/ delete part:id");
});

module.exports = router;
