"use strict";
const User = require("../models/userModel");

class userService {
  static async login(data) {
    return await User.create({ data });
  }

  static async registration(data) {
    const userData = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      active: data.active,
    });

    return await User(userData).save();
  }

  /*   static async updateUser(id, data) {
    return await User.findOneAndUpdate(id, { $set: data });
  } */

  static async updateUser(id, data) {
    console.log(id, data);
    return await User.findByIdAndUpdate(id, { $set: data });
  }

  static async checkEmailExist(email) {
    return await User.findOne({ email });
  }

  static async checkActiveStatus(email) {
    return await User.findOne({ email: email, activeStatus: false });
  }

  static async checUserExist(data) {
    const { email, password } = data;
    return await await User.findOne({ email }).select("+password");
  }

  static async deleteUser(id) {
    return await User.findOneAndDelete(id);
  }

  static async getAll() {
    return await User.find({});
  }

  static async getById(id) {
    return await User.findById(id);
  }
}

module.exports = userService;
