import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ethers } from "ethers";
import VoucherModel from "./model/voucher";
import Voucher from "../../build/contracts/Voucher.json";

const app: Application = express();
const router = express.Router();

mongoose
  .connect(
    "mongodb+srv://sarzy-ecom:salzkid24@ecom.isgtu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
  })
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

//routes

router.post("/create/:name", async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const newVoucher = await new VoucherModel({ name: name });
    newVoucher.save();
  } catch (error) {
    console.log(error);
  }
});

const listenToEvents = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:9545"
  );

  const networkId = "5777";

  const voucherContract = new ethers.Contract(
    Voucher.networks[networkId].address,
    Voucher.abi,
    provider
  );

  voucherContract.on(
    "VoucherCreated",
    async (value, creator, voucher, date) => {
      console.log(
        `value ${value} creator ${creator} voucher ${voucher} date ${new Date(
          date.toNumber() * 1000
        ).toLocaleString()} `
      );

      const voucherFind = await VoucherModel.findOne({ name: voucher });

      if (voucherFind) {
        voucherFind.creator = creator;
        voucherFind.value = value;
        voucherFind.date = new Date(date.toNumber() * 1000).toLocaleString();
        await voucherFind.save();
      }
    }
  );

  voucherContract.on(
    "VoucherReedeemed",
    async (voucher, value, reedeemer, date) => {
      console.log(
        "Reedeemed ==>",
        `voucher ${voucher} value ${value} reedeemer ${reedeemer}`
      );
    }
  );
};

listenToEvents();
