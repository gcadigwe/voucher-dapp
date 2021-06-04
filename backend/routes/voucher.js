const express = require("express");
const router = express.Router();

const { create } = require("../controller/voucher");

router.post("/voucher/create", create);

module.exports = router;
