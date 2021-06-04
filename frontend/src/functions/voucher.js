import axios from "axios";

export const find = async (voucherName) =>
  await axios.post(`${process.env.REACT_APP_API}/voucher/find`, {
    name: voucherName,
  });
