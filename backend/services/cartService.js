"use strict";
const Cart = require("../models/cartModel");

class cartService {
  static async getAll() {
    return await Cart.find({});
  }

  static async getById(id) {
    return await Cart.findById(id);
  }

  static async create(data) {
    return await Cart(data).save();
  }

  static async update(id, data) {
    return await Cart.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async delete(id) {
    return await Cart.findByIdAndDelete({ _id: id });
  }
}
module.exports = cartService;
