const express = require("express");
const router = express.Router();

const { create, redeem, find } = require("../controller/voucher");

router.post("/voucher/create", create);
router.post("/voucher/redeem", redeem);
router.post("/voucher/find", find);

module.exports = router;
