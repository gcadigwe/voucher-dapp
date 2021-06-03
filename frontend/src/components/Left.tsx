import React from "react";
import "./Left.css";

interface ListProps {
  signerAd: string;
  contract: {};
}

const Left: React.FC<ListProps> = ({ signerAd, contract }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // contract.createVoucher;
  };

  return (
    <div className="left">
      <h2>Creator - {signerAd} </h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Voucher Name</label>
        <input className="name" type="text" />
        <label>Voucher Value</label>
        <input type="number" className="number" min="0.1" max="5" />

        <button className="btn">Create</button>
      </form>
    </div>
  );
};

export default Left;
