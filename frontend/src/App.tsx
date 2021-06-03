import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";

function App() {
  const [contract, setContract] = useState({});
  useEffect(() => {
    const load = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:9545"
      );
      const signer = provider.getSigner();
      let window: any;

      const contractAddress = Voucher.networks["5777"].address;

      const voucherContract = new ethers.Contract(
        contractAddress,
        Voucher.abi,
        provider
      );

      setContract(voucherContract);

      console.log(await provider.getBalance(voucherContract.address));
    };

    load();
    console.log(contract);
  }, []);

  return <div className="app">Hello world</div>;
}

export default App;
