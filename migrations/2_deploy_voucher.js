const Voucher = artifacts.require("Voucher.sol");

module.exports = async function (deployer, network, addresses) {
  if (network === "develop") {
    await deployer.deploy(Voucher);
    const voucher = await Voucher.deployed();
  }
};
