import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  find,
  create,
  redeem,
  usedvoucher,
  findall,
  check,
} from "./functions/voucher";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  const [foundVouchers, setFoundVouchers] = useState([]);
  const [foundUsedVouchers, setUsedVouchers] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [voucherValue, setVoucherValue] = useState("");
  const [redeemValue, setRedeemValue] = useState("");
  const [redeemAddressValue, setredeemAddressValue] = useState("");
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    loadData();
    findallVouchers();
    // findallVouchersRedeemed();
    findused();
  }, []);

  //checks if account was changed in metamask and reloads after 100ms
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function () {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }

  //find all vouchers

  const findallVouchers = () => {
    findall().then((res) => {
      setFoundVouchers(res.data);
    });
  };

  // find all vouchers redeemed by this address/user

  const findused = () => {
    usedvoucher().then((res) => {
      setUsedVouchers(res.data);
    });
  };

  const createVoucherCheck = async (voucherName, voucherValue) => {
    find(voucherName).then((res) => {
      if (res.data.exist) {
        return toast.error(`Voucher ${voucherName} Already Created`);
      }

      createVoucher(voucherName, voucherValue);
      console.log("got here");
    });
  };

  const redeemVoucherCheck = async (voucherName) => {
    check(voucherName).then((res) => {
      if (res.data.used === true) {
        return toast.error("Voucher already used");
      } else if (res.data.message === "voucher not found") {
        return toast.error("Voucher is invalid");
      }

      redeemVoucher(voucherName, redeemAddressValue);
    });
  };

  //Create Voucher
  const createVoucher = async (voucherName, voucherValue) => {
    setCreateLoading(true);
    console.log("here V");
    const finalValue = ethers.utils.parseEther(voucherValue);
    const txResponse = await contract.functions.createVoucher(
      finalValue,
      voucherName
    );
    const txReceipt = await txResponse.wait();
    console.log(txReceipt);

    contract.on("VoucherCreated", async (value, creator, voucher, date) => {
      console.log(
        `value ${value} creator ${creator} voucher ${voucher} date ${new Date(
          date.toNumber() * 1000
        ).toLocaleString()} `
      );

      const used = false;
      create(voucherName, voucherValue, creator, used).then((res) => {});
      setCreateLoading(false);
      toast.success(`Voucher created successfully`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  //Redeem Voucher

  const redeemVoucher = async (voucherName, redeemAddressValue) => {
    setRedeemLoading(true);
    console.log("here R");
    const txResponse = await contract.functions.reedemVoucher(
      voucherName,
      redeemAddressValue
    );
    const txReceipt = await txResponse.wait();

    contract.on("VoucherReedeemed", async (voucher, value, reedeemer, date) => {
      console.log(
        `voucher ${voucher} value ${value} redeemer ${reedeemer} date ${new Date(
          date.toNumber() * 1000
        ).toLocaleString()}`
      );

      redeem(reedeemer, voucherName).then((res) => {
        setRedeemLoading(false);
        if (res.data) {
          toast.success(`Voucher Redeemed successfully`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    });
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    createVoucherCheck(nameValue.toUpperCase(), voucherValue);
    setVoucherValue("");
    setNameValue("");
  };

  const handleRedeem = (e) => {
    e.preventDefault();
    redeemVoucherCheck(redeemValue.toUpperCase(), redeemAddressValue);
    setRedeemValue("");
    setredeemAddressValue("");
  };

  const loadData = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.InfuraProvider(
        "ropsten",
        "0c41bc9d34ee4c46bdcd260bc6eab9fb"
      );

      const address = Voucher.networks[window.ethereum.networkVersion].address;

      const signer = new ethers.Wallet(
        "239201d7b1a1874c674dc8f1d94bacc6d5a7846fc710ef7e592230c691c7bd7b",
        provider
      );

      const voucherContract = new ethers.Contract(address, Voucher.abi, signer);
      console.log(signer);

      setContract(voucherContract);

      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      // const txResponse = await voucherContract.createVoucher(100, 123);
      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);

      // const balance = await voucherContract.balanceOf();
      // console.log(parseInt(balance._hex));

      // const CurrentSigneraddress = signer.getAddress().then((res) => {
      //   setCurrentSigneraddress(res);
      // });
    }
  };

  console.log(contract);

  return (
    <>
      <ToastContainer />
      <div className="app">
        <div className="left">
          <h1>Voucher</h1>
          <div className="vouchers-created">
            <h2>Vouchers Created</h2>
            <ul>
              {foundVouchers &&
                foundVouchers.map((foundVoucher) => (
                  <li key={foundVoucher._id}>
                    Name: {foundVoucher.name},{" "}
                    <span>Value: {foundVoucher.value}eth</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="left-input-container">
            {createLoading ? <h2>Loading...</h2> : <h2></h2>}
            <h2>Create Voucher</h2>
            <form onSubmit={handleCreateVoucher} className="left-form">
              <label>VOUCHER NAME</label>
              <input
                className="left-input"
                type="text"
                required
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />

              <label>
                VOUCHER VALUE<small>(Should be in ether)</small>
              </label>
              <input
                className="left-input"
                type="number"
                required
                max="1"
                value={voucherValue}
                onChange={(e) => setVoucherValue(e.target.value)}
              />

              <button className="left-btn">CREATE</button>
            </form>
          </div>
        </div>
        <div className="right">
          <h1>Dapp</h1>
          <div className="vouchers-redeemed">
            <h2>Used Vouchers</h2>
            <ul>
              {foundUsedVouchers &&
                foundUsedVouchers.map((foundvoucher) => (
                  <li key={foundvoucher._id}>Name: {foundvoucher.name}</li>
                ))}
            </ul>
          </div>
          <div className="right-input-container">
            {redeemLoading ? <h2>Loading...</h2> : <h2></h2>}
            <h2>Redeem Voucher</h2>
            <form onSubmit={handleRedeem} className="right-form">
              <label>VOUCHER NAME</label>
              <input
                className="right-input"
                type="text"
                value={redeemValue}
                onChange={(e) => setRedeemValue(e.target.value)}
              />
              <label>ETH Address</label>
              <input
                className="right-input"
                type="string"
                value={redeemAddressValue}
                onChange={(e) => setredeemAddressValue(e.target.value)}
              />

              <button className="right-btn">REDEEM</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
