import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import { find, create } from "./functions/voucher";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [CurrentSigneraddress, setCurrentSigneraddress] = useState("0x0000");
  useEffect(() => {
    loadData();
  }, []);

  const loadTx = async (voucherName) => {
    find(voucherName).then((res) => {
      if (res.data.exist) {
        return console.log("cannot create");
      }

      console.log("next");
      createVoucher();
    });
  };
  const createVoucher = async () => {
    const txResponse = await contract.createVoucher(1000, 5115);
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);

    contract.on("VoucherCreated", async (value, creator, voucher, date) => {
      console.log(
        `value ${value} creator ${creator} voucher ${voucher} date ${new Date(
          date.toNumber() * 1000
        ).toLocaleString()} `
      );
      const used = false;
      create(voucher.toNumber(), value.toNumber(), creator, used).then(
        (res) => {
          console.log(res);
        }
      );
    });
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    loadTx(5116);
  };

  // loadTx(5111);

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

      const CurrentSigneraddress = signer.getAddress().then((res) => {
        // console.log(res.toString());
        setCurrentSigneraddress(res);
      });

      setContract(voucherContract);

      // const txResponse = await voucherContract.createVoucher(1000, 5112);

      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);

      // const txResponse = await voucherContract.reedemVoucher(5112);
      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);
    }
  };

  console.log(CurrentSigneraddress);

  // const listenToEvents = () => {
  //   contract.on("VoucherCreated", async (value, creator, voucher, date) => {
  //     console.log(
  //       `value ${value} creator ${creator} voucher ${voucher} date ${new Date(
  //         date.toNumber() * 1000
  //       ).toLocaleString()} `
  //     );
  //   });
  // };

  // listenToEvents();

  return (
    <div className="app">
      <div className="left">
        <h1>Voucher</h1>
        <h2>
          Current Creator's address:
          <span className="address"> {CurrentSigneraddress}</span>
          <br />
          Balance: <span className="address"></span>
        </h2>
        <div className="vouchers-created">
          <h2>Vouchers Created by this address</h2>
          {/* <ul>
            <li>Name: 5112, <span>Value: 100</span></li>
            <li>Name: 5112, <span>Value: 100</span></li>
          </ul> */}
        </div>
        <div className="left-input-container">
          <h2>Create Voucher</h2>
          <form className="left-form">
            <label>VOUCHER NAME</label>
            <input className="left-input" type="number" />

            <label>VOUCHER VALUE</label>
            <input className="left-input" type="number" />

            <button className="left-btn">CREATE</button>
          </form>
        </div>
      </div>
      <div className="right">
        <h1>Dapp</h1>
        <h2>
          Current Redeemer's address:
          <span className="address">
            0x37b6183D7dfA026488841Dbb601Cd8B90D478529
          </span>
          <br />
          Balance: <span className="address"></span>
        </h2>
        <div className="vouchers-redeemed">
          <h2>Vouchers Redeemed by this address</h2>
          {/* <ul>
            <li>Name: 5112, <span>Value: 100</span></li>
            <li>Name: 5112, <span>Value: 100</span></li>
          </ul>  */}
        </div>
        <div className="right-input-container">
          <h2>Redeem Voucher</h2>
          <form className="right-form">
            <label>VOUCHER NAME</label>
            <input className="right-input" type="number" />

            <button className="right-btn">REDEEM</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
