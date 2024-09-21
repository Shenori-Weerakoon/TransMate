import React, { useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import NavBar from '../Home/Navbar';


const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Hardcoded admin credentials
      const hardcodedAdmin = {
        email: "admin@gmail.com",
        password: "123456"
      };

      // Check for hardcoded admin credentials
      if (email === hardcodedAdmin.email && password === hardcodedAdmin.password) {
        console.log("Admin login successful");
        navigate("/admin"); // Navigate to the admin dashboard or page
      } 
      // Here, you can add logic for user authentication, such as calling an API
      else {
        console.log("User login successful");
        navigate("/user-dashboard"); // Navigate to the user dashboard after successful login
      }
    }
  };

  return (       
    <div className="App">
      <nav className="navbar">
        <NavBar />
      </nav>
    <div className="background">
      <div className="card col-md-6 col-lg-4">
        <h1 className="card-header">
          Login <FaUserCheck />
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Index;