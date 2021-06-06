const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const redeemSchema = new mongoose.Schema(
  {
    redeemer: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Redeem", redeemSchema);
