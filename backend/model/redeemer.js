const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const redeemSchema = new mongoose.Schema({
  redeemer: [
    {
      voucher: {
        type: ObjectId,
        ref: "Voucher",
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Redeem", redeemSchema);
