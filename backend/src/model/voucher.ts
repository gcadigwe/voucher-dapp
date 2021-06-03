import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    creator: String,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.model("VoucherModel", voucherSchema);
