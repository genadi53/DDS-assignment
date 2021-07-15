const express = require("express");
const router = express.Router();
const CartPartsController = require("../contollers/parts-controller");

router.get("/", CartPartsController.getAllParts);

router.post("/", CartPartsController.createNewPart);

router.get("/:id", CartPartsController.findPart);

// router.patch;
router.put("/:id", CartPartsController.updatePart);

router.delete("/:id", CartPartsController.deletePart);

module.exports = router;
