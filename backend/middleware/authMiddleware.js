const jwt = require("jsonwebtoken"); // Importing the JSON Web Token module
const asyncHandler = require("express-async-handler"); // Importing the async handler utility
const User = require("../models/userModel"); // Importing the User model

// Middleware function to protect routes by verifying JWT
const protect = asyncHandler(async (req, res, next) => {
  let token; // Variable to store the extracted token

  // Check if the authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token

    try {
      // Verify the token
      const {_id} = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded token's ID and exclude the password field
      req.user = await User.findById({_id}).select(_id);
      next();
     

      // If user is not found
      if (!req.user) {
        res.status(404);
        throw new Error("User not found");
      }

      next(); // Call next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error); // More informative logging
      res.status(401); // Set HTTP status code to 401 (Unauthorized)
      throw new Error("Not authorized"); // Throw an error indicating unauthorized access
    }
  } else {
    // If token is not present or not properly formatted
    res.status(401); // Set HTTP status code to 401 (Unauthorized)
    throw new Error("Not authorized"); // Throw an error indicating unauthorized access
  }
});

module.exports = { protect }; // Export the protect middleware function
