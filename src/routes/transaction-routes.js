const express = require("express");
const router = express.Router();
const TransactionController = require("../contollers/transaction-controller");

router.post("/", TransactionController.sendEmail);

module.exports = router;
