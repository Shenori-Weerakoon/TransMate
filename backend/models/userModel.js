const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add a full name"],
    },
    username: {
      type: String,
      required: [true, "Please add an username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    contactNumber: {
      type: String,
      required: [true, "Please add a contact number"],
      minlength: [10, "Contact number must be 10 digits long"],
      maxlength: [10, "Contact number must be 10 digits long"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    Id: {
      type: String,
      required: true,
      
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
