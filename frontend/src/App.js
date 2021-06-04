import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voucher from "./contracts/Voucher.json";
import { find, create } from "./functions/voucher";
import "./App.css";

function App() {
  const [contract, setContract] = useState(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadTx = async (voucherName) => {
    // console.log(voucherTx);
    // if (name) {
    //   await axios.get("");
    // }

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

      setContract(voucherContract);

      // const txResponse = await voucherContract.createVoucher(1000, 5112);

      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);

      // const txResponse = await voucherContract.reedemVoucher(5112);
      // const txReceipt = await txResponse.wait();
      // console.log(txReceipt);
    }
  };

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
    <div className="App">
      Hello world
      <button onClick={() => loadTx(5115)}>Submit</button>
    </div>
  );
}

export default App;
