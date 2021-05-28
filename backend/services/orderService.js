"use strict";
const Order = require("../models/orderModel");

class cartService {
  static async getAll(_id) {
    return await Order.find({ user: _id });
  }

  static async getById(id) {
    return await Order.findById(id);
  }

  static async create(data) {
    return await Order(data).save();
  }

  static async update(id, data) {
    return await Order.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async delete(id) {
    return await Order.findByIdAndDelete({ _id: id });
  }
}
module.exports = cartService;
