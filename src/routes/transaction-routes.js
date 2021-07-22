const express = require("express");
const router = express.Router();
const TransactionController = require("../contollers/transaction-controller");

router.post("/", TransactionController.makeNewTransaction);

module.exports = router;
