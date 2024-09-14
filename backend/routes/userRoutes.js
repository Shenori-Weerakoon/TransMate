const express = require('express');
const router = express.Router();
const {
  userRegister,
  userLogin,
  logoutUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  
} = require('../controllers/userController.js'); 



// Register a new user
router.post('/register', userRegister);

// Login user
router.post('/login', userLogin);

// Logout user
router.post('/logout', logoutUser);

// Update user details
router.put('/update/:Id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/get/:id", getUserById);

module.exports = router;
