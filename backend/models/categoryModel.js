const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      time: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
