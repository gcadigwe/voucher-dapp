const express = require("express");
const router = express.Router();

const {
  create,
  redeem,
  find,
  getAllVouchers,
  findUsedVouchers,
  checkUsedVoucher,
} = require("../controller/voucher");

router.post("/voucher/create", create);
router.post("/voucher/redeem", redeem);
router.post("/voucher/find", find);
router.get("/voucher/findall", getAllVouchers);
router.get("/voucher/findused", findUsedVouchers);
router.post("/voucher/check", checkUsedVoucher);

module.exports = router;
