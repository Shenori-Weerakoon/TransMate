const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const moment = require("moment");

const generateToken = (Id) => {
  return jwt.sign({ Id}, process.env.JWT_SECRET, { expiresIn: "10h" });
};
const userRegister = expressAsyncHandler(async (req, res) => {
  const { fullName, username, email, contactNumber, password } = req.body;

  // Validation
  if (!fullName ||!username ||  !email || !contactNumber || !password) {
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
  } while (await User.findOne({ id: newId }));

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
      token: generateToken(newUser._id),
      message: "User registered successfully",
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});



const userLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: "Please provide email or username and password" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.Id}, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user details and token
    res.status(200).json({
      userId: user.Id,
      fullName: user.fullName,
      email: user.email,
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");// Clear token cookie

    // Send response indicating successful logout
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update User
const updateUser = async (req, res) => {
  const userId = req.params.Id;
  const { fullName, username, email, contactNumber, password } = req.body;

  try {
    if (!fullName || !username || !email || !contactNumber  || !password) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    if (!validator.isLength(contactNumber, { min: 10, max: 10 })) {
      return res.status(400).json({ error: "Contact number must be 10 digits long" });
    }

    // // Find the user by ID
    // const updatedUser = await User.findByIdAndUpdate(userId, {
    //   fullName,
    //   username,
    //   email,
    //   contactNumber,
    //   password: await bcrypt.hash(password, 10),
    // }, { new: true });

    // Find user by ID
    const user = await User.findOne({ Id: userId });

    //update user fields
    if (fullName)user.fullName = fullName;
    if (username)user.username = username;
    if (email)user.email = email;
    if (contactNumber)user.contactNumber = contactNumber;
    if (password) {
      // Hash and update password
      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;
    }

     // Save updated user
     await user.save();

    // if (!updatedUser) {
    //   return res.status(404).json({ error: "User not found" });
    // }

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
};

// Delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findOneAndDelete({Id: userId});
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
const getUserById = async (req, res) => {
  const userId = req.params.id;  // Ensure parameter name matches the route definition

  try {
    const user = await User.findOne({ Id: userId }); // Ensure 'id' matches your schema field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};



module.exports = {
  userRegister,
  userLogin,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  
};
