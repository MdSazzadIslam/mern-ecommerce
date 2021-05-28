"use strict";
const Category = require("../models/categoryModel");

class categoryService {
  static async getAll() {
    return await Category.find({});
  }

  static async getById(id) {
    return await Category.findById(id);
  }

  static async isNameExists(name) {
    return await Category.findOne({
      name: new RegExp(`^${name}$`, "i"), //for case sensitive options
    });
  }

  static async create(data) {
    return await Category(data).save();
  }

  static async update(id, data) {
    return await Category.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async delete(id) {
    return await Category.findByIdAndDelete({ _id: id });
  }
}
module.exports = categoryService;
