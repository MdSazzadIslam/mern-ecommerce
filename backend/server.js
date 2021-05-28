const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./.env" });
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

//////////Routes///////////////////////////////////////////////////////
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
//////////////////////////////////////////////////////////////////////
const { connectDB } = require("./config/db");
const main = async () => {
  await connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());

  //morgan only use for developement purpose
  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
  }

  //Bodyparser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //create a write stream(in append mode)
  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "/logs/access.log"),
    { flags: "a" }
  );
  //setup the logger
  app.use(logger("combined", { stream: accessLogStream }));
  //Serves all the request which includes /images in the url from Images folder
  app.use("/images", express.static(__dirname + "/images"));

  app.get("/", (req, res) => {
    res.send("API is running");
  });
  app.use("/api/user", userRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/product", productRoute);
  app.use("/api/inventory", inventoryRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/order", orderRoute);
  const PORT = process.env.PORT || 5000;
  console.log(`Server environment is ${process.env.NODE_ENV}`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
main().catch((err) => {
  console.log(err);
});
