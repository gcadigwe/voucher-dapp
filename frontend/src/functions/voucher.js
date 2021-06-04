import axios from "axios";

export const find = async (voucherName) =>
  await axios.post(`${process.env.REACT_APP_API}/voucher/find`, {
    name: voucherName,
  });

export const create = async (voucherName, value, creator, used) =>
  await axios.post(`${process.env.REACT_APP_API}/voucher/create`, {
    name: voucherName,
    value: value,
    creator: creator,
    used: used,
  });
