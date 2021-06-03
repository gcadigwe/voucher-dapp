import React from "react";
import "./Right.css";

interface ListProps {
  signerAd: string;
}

const Right: React.FC<ListProps> = ({ signerAd }) => {
  return (
    <div className="right">
      <h2>Reedeemer - {signerAd} </h2>
      <form>
        <label>Input voucher name to reedeem</label>
        <input className="name" type="text" />
        <button>Reedem</button>
      </form>
    </div>
  );
};

export default Right;
