import React, { FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import Left from "./components/Left";
import Right from "./components/Right";

function App() {
  const [contract, setContract] = useState({});
  const [signer, setSigner] = useState({});
  const [signerAddress, setSignerAddress] = useState("");
  useEffect(() => {
    const load = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:9545"
      );
      const signer = provider.getSigner();
      let window: any;

      const contractAddress = Voucher.networks["5777"].address;

      const voucherContract = await new ethers.Contract(
        contractAddress,
        Voucher.abi,
        provider
      );

      const balance = await voucherContract.balanceOf();
      console.log(parseInt(balance._hex));

      const address = await signer.getAddress().then((res) => {
        console.log(signer);
        setSignerAddress(res);
      });

      console.log(provider);

      setContract(voucherContract);
      setSigner(signer);

      // console.log(await provider.getBalance(voucherContract.address));
    };

    load();
  }, []);

  return (
    <div className="app">
      <div className="left">
        <h2>Creator - {signerAddress} </h2>
        <form className="left__form">
          <label>Voucher Name</label>
          <input className="left__name" type="text" />
          <label>Voucher Value</label>
          <input type="number" className="left__number" min="0.1" max="5" />

          <button className="left__btn">Create</button>
        </form>
      </div>

      <div className="right">
        <h2>Reedeemer - {signerAddress} </h2>
        <form className="right__form">
          <label>Input voucher name to reedeem</label>
          <input className="right__name" type="text" />
          <button className="right__btn">Reedem</button>
        </form>
      </div>
    </div>
  );
}

export default App;
