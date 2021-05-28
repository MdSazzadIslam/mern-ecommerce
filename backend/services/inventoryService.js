"use strict";
const Inventory = require("../models/inventoryModel");

class inventoryService {
  static async getAll() {
    return await Inventory.find({});
  }

  static async getById(id) {
    return await Inventory.findById(id);
  }

  static async create(data) {
    return await Inventory(data).save();
  }

  static async update(id, data) {
    return await Inventory.findOneAndUpdate({ _id: id }, { $set: data });
  }

  static async delete(id) {
    return await Inventory.findByIdAndDelete({ _id: id });
  }
}
module.exports = inventoryService;
