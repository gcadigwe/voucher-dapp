const express = require("express");
const router = express.Router();

const {
  create,
  redeem,
  find,
  findVoucherCreatedByCurrentCreator,
  findVoucherRedeemedByCurrentRedeemer,
  checkUsedVoucher,
} = require("../controller/voucher");

router.post("/voucher/create", create);
router.post("/voucher/redeem", redeem);
router.post("/voucher/find", find);
router.post("/voucher/findall", findVoucherCreatedByCurrentCreator);
router.post("/voucher/findredeemer", findVoucherRedeemedByCurrentRedeemer);
router.post("/voucher/check", checkUsedVoucher);

module.exports = router;
