import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import {
  find,
  create,
  redeem,
  findredeemer,
  findall,
  check,
} from "./functions/voucher";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [CurrentSigneraddress, setCurrentSigneraddress] = useState("0x0000");
  const [CurrentSignerBalance, setCurrentSignerBalance] = useState(0);
  const [foundVouchers, setFoundVouchers] = useState([]);
  const [foundRedeemer, setFoundRedeemerVouchers] = useState([]);

  useEffect(() => {
    loadData();
    findallVouchers();
    findallVouchersRedeemed();
  }, [CurrentSigneraddress, foundVouchers, foundRedeemer]);

  //find all vouchers created by this current admin/signer

  const findallVouchers = () => {
    findall(CurrentSigneraddress).then((res) => {
      console.log(res);
      setFoundVouchers(res.data);
    });
  };

  // find all vouchers redeemed by this address/user

  const findallVouchersRedeemed = () => {
    findredeemer(CurrentSigneraddress).then((res) => {
      console.log(res);
      setFoundRedeemerVouchers(res.data);
    });
  };

  const createVoucherCheck = async (voucherName) => {
    find(voucherName).then((res) => {
      if (res.data.exist) {
        return console.log("cannot create");
      }

      console.log("next");
      createVoucher();
    });
  };

  const redeemVoucherCheck = async (voucherName) => {
    check(voucherName).then((res) => {
      if (res.used === true) {
        return console.log("Voucher already used");
      }
      console.log("next");
      redeemVoucher();
    });
  };

  //Create Voucher
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

  //Redeem Voucher

  const redeemVoucher = async () => {
    const txResponse = await contract.reedemVoucher(5112);
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);

    contract.on("VoucherReedeemed", async (voucher, value, reedeemer, date) => {
      console.log(
        `voucher ${voucher} value ${value} redeemer ${reedeemer} date ${new Date(
          date.toNumber() * 1000
        ).toLocaleString()}`
      );
      redeem(voucher.toNumber(), value.toNumber(), reedeemer).then((res) => {
        console.log(res);
      });
    });
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    // createTx(5116);
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
        setCurrentSignerBalance(parseInt(res._hex));
      });

      const CurrentSigneraddress = signer.getAddress().then((res) => {
        // console.log(res.toString());
        setCurrentSigneraddress(res);
      });

      setContract(voucherContract);
    }
  };

  console.log(CurrentSigneraddress);

  return (
    <div className="app">
      <div className="left">
        <h1>Voucher</h1>
        <h2>
          Current Creator's address:
          <span className="address"> {CurrentSigneraddress}</span>
          <br />
          Balance: <span className="address">{CurrentSignerBalance}</span>
        </h2>
        <div className="vouchers-created">
          <h2>Vouchers Created by this address</h2>
          <ul>
            {foundVouchers &&
              foundVouchers.map((foundVoucher) => (
                <li key={foundVoucher._id}>
                  Name: {foundVoucher.name},{" "}
                  <span>Value: {foundVoucher.value}</span>
                </li>
              ))}
          </ul>
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
          <span className="address">{CurrentSigneraddress}</span>
          <br />
          Balance: <span className="address">{CurrentSignerBalance}</span>
        </h2>
        <div className="vouchers-redeemed">
          <h2>Vouchers Redeemed by this address</h2>
          <ul>
            {foundRedeemer &&
              foundRedeemer.map((foundvoucher) => (
                <li key={foundvoucher._id}>Name: {foundvoucher.name}</li>
              ))}
          </ul>
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
