const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

//app
const app = express();

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

//middlewares
app.use(morgan("dev"));
// app.use(bodyParse.json({ limit: "2mb" }));
app.use(cors());
app.use(express.json());

//autoloading routes
fs.readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});

//connecting port

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
