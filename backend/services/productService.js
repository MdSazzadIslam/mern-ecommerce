"use strict";
const Product = require("../models/productModel");

class productService {
  static async getAll() {
    return await Product.find({});
  }

  static async getById(id) {
    return await Product.findById(id);
  }

  static async create(data) {
    return await Product(data).save();
  }

  static async update(id, data) {
    return await Product.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async delete(id, data) {
    return await Product.findByIdAndDelete({ _id: id });
  }
}

module.exports = productService;
