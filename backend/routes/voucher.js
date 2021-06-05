const express = require("express");
const router = express.Router();

const {
  create,
  redeem,
  find,
  findVoucherCreatedByCurrentCreator,
  findVoucherRedeemedByCurrentRedeemer,
} = require("../controller/voucher");

router.post("/voucher/create", create);
router.post("/voucher/redeem", redeem);
router.post("/voucher/find", find);
router.post("/voucher/findall", findVoucherCreatedByCurrentCreator);
router.post("/voucher/findredeemer", findVoucherRedeemedByCurrentRedeemer);

module.exports = router;
