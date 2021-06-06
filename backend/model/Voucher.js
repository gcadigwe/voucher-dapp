const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
  creator: {
    type: String,
  },
  used: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
