import React, { useEffect } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import "./App.css";

function App() {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = Voucher.networks["5777"].address;

      const voucherContract = new ethers.Contract(address, Voucher.abi, signer);

      const balance = signer.getBalance().then((res) => {
        console.log(parseInt(res._hex));
      });

      // const txResponse = await voucherContract.createVoucher(1000, 5112);
      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);

      const txResponse = await voucherContract.reedemVoucher(5112);
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
    }
  };
  return <div className="App">Hello world</div>;
}

export default App;
