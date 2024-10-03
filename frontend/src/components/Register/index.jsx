import './register.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Home/Navbar';
import { FaUserCheck } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
  fullName: '',
  username: '',
  email: '',
  contactNumber: '',
  password: '',
};

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsObj = validateForm();
    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      console.log(response.data);
      
      // Store user information in localStorage
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userEmail", formData.email);

      toast.success("User registered successfully!");
      setFormData(initialState);
      navigate(`/login`);
    } catch (error) {
      console.error("Error:", error.response?.data?.error || "Unknown error");
      toast.error(error.response?.data?.error || "Failed to register user");
    }
  };

  const validateForm = () => {
    const { fullName, username, email, contactNumber, password } = formData;
    const errors = {};

    if (!fullName) errors.fullName = "Full Name is required.";
    if (!username) errors.username = "Username is required.";
    if (!email) errors.email = "Email is required.";
    if (!contactNumber) errors.contactNumber = "Mobile Number is required.";
    if (!password) errors.password = "Password is required.";

    if (contactNumber && !/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = "Mobile Number must be 10 digits.";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (password && password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  return (
    <div className="App">
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="background">
        <div className="card col-md-8 col-lg-6 mx-auto mt-5">
          <h1 className="card-header text-center">
            Register <FaUserCheck />
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">Phone Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter your phone number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
                {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
