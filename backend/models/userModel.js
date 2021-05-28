const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 150,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 150,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },

    profileImage: {
      type: String,
    },

    phoneNo: {
      type: String,
    },

    gender: {
      type: String,
    },

    activeStatus: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
