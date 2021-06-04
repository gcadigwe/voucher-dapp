const Voucher = require("../model/Voucher");

exports.create = async (req, res) => {
  const { name, value, creator, used } = req.body;

  try {
    const createVoucher = await new Voucher({
      name: name,
      value: value,
      creator: creator,
      used: used,
    }).save();
    res.json(createVoucher);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Voucher Failed");
  }
};
