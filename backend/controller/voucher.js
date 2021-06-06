const Voucher = require("../model/Voucher");
const Redeem = require("../model/redeemer");

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

exports.redeem = async (req, res) => {
  const { redeemer, name } = req.body;

  try {
    const redeem = await new Redeem({
      redeemer: redeemer,
      name: name,
    }).save();

    const update = await Voucher.findOneAndUpdate(
      { name: name },
      {
        used: true,
      }
    ).exec();

    res.json(update);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Redeemer Failed");
  }
};

exports.find = async (req, res) => {
  const { name } = req.body;

  const voucher = await Voucher.findOne({ name: name }).exec();

  if (voucher) {
    res.json({
      exist: true,
    });
  } else {
    res.json({
      exist: false,
    });
    console.log("no voucher found");
  }
};

// exports.findVoucherCreatedByCurrentCreator = async (req, res) => {
//   const { creator } = req.body;

//   const vouchers = await Voucher.find({ creator: creator }).exec();

//   if (vouchers) {
//     res.json(vouchers);
//   } else {
//     {
//       res.json({
//         message: "Can't find any voucher created by this user",
//       });
//     }
//   }
// };

exports.getAllVouchers = async (req, res) => {
  const found = await Voucher.find({}).exec();
  res.json(found);
};

exports.findUsedVouchers = async (req, res) => {
  const used = await Voucher.find({ used: true }).exec();
  res.json(used);
};

exports.checkUsedVoucher = async (req, res) => {
  const { name } = req.body;

  const used = await Voucher.findOne({ name: name }).exec();

  if (used) {
    res.json(used);
  } else {
    res.json({
      message: "voucher not found",
    });
  }
};
