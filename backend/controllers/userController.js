// authController.js

const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();
// Removed JWT import as it's no longer needed
// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

// Removed generateToken function as JWT is not used anymore

// User Registration
const userRegister = expressAsyncHandler(async (req, res) => {
  const { fullName, username, email, contactNumber, password } = req.body;

  // Validation
  if (!fullName || !username || !email || !contactNumber || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email is not valid");
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
    return res
      .status(400)
      .json({ error: "Contact number must be 10 digits long" });
  }

  let Id;

  // Generate a unique user ID
  let newId;
  do {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "US" + randomNum.toString();
  } while (await User.findOne({ Id: newId }));

  Id = newId;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullName,
      username,
      email,
      contactNumber,
      password: hashedPassword,
      Id,
    });
    await newUser.save();

    if (newUser) {
      res.status(201).json({
        id: newUser.Id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        contactNumber: newUser.contactNumber,
        message: "User registered successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// User Login
const userLogin = expressAsyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email or username and password" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Return user details (excluding token)
    res.status(200).json({
      userId: user.Id,
      fullName: user.fullName,
      email: user.email,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Logout User
const logoutUser = expressAsyncHandler(async (req, res) => {
  try {
    // If you're using sessions, you would destroy the session here
    // For example:
    // req.session.destroy(err => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ success: false, message: "Server error" });
    //   }
    //   res.clearCookie("connect.sid"); // Assuming default session cookie name
    //   res.status(200).json({ success: true, message: "Logout successful" });
    // });

    // Since JWT is removed and sessions are not implemented, simply respond
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update User
const updateUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.Id;
  const { fullName, username, email, contactNumber, password } = req.body;

  try {
    if (!fullName || !username || !email || !contactNumber || !password) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
      return res
        .status(400)
        .json({ error: "Contact number must be 10 digits long" });
    }

    // Find user by ID
    const user = await User.findOne({ Id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (contactNumber) user.contactNumber = contactNumber;
    if (password) {
      // Hash and update password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword; // Corrected from customer.password to user.password
    }

    // Save updated user
    await user.save();

    res.status(200).json({
      id: user.Id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      contactNumber: user.contactNumber,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete User
const deleteUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({ Id: userId });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Get All Users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get User By ID
const getUserById = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id; // Ensure parameter name matches the route definition

  try {
    const user = await User.findOne({ Id: userId }); // Ensure 'Id' matches your schema field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = {
  userRegister,
  userLogin,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
