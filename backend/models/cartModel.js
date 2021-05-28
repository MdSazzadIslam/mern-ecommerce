const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },

    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;
