require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connection successfull");
  } catch (error) {
    console.error("Database Connection fail", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    console.log("Database connection close");
    return mongoose.disconnect();
  } catch (error) {
    console.log("Database disconnection error", error);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
