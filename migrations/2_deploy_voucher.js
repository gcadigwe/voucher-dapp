const Voucher = artifacts.require("Voucher.sol");

module.exports = async function (deployer, network, addresses) {
  if (network === "develop") {
    await deployer.deploy(Voucher, {
      from: addresses[0],
      value: "2000000000000000000",
    });
    const voucher = await Voucher.deployed();
  } else if (network === "ropsten") {
    await deployer.deploy(Voucher, {
      from: addresses[0],
      value: "500000000000000000",
    });
  }
};
