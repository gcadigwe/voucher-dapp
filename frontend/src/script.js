import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";

const getBlockchain = () => {
  window.addEventListener("load", async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = Voucher.networks["5777"].address;

      const voucherContract = new ethers.Contract(address, Voucher.abi, signer);

      return { voucherContract, provider };
    }
  });
};

export default getBlockchain;
