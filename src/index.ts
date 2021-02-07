import express, { Application } from "express";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
import { ProduitRoute } from "./routes/produit";

//init app express
const app: Application = express();

app.use(bodyParser.json({ extended: true }));

//connection in databse (mongodb)
const uri = "mongodb://localhost:27017/backoffice";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check mongodb connection
const db = mongoose.connection;
db.on("error", (error: any) => {
  console.log("Error", error);
});
db.once("open", function () {
  console.log("Connected db");
});

//route for product ***
app.use("/produit", ProduitRoute);
app.use("/", (req, res) => {
  res.send({
    status: 200,
  });
  console.log("running...");
});

//run serve
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`runing on ${port}`);
  const all_routes = require("express-list-endpoints");
  console.log(all_routes(app));
});
