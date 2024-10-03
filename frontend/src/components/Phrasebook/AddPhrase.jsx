import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from "./SideBar";

const initialState = {
  phrase: "",
  translation: "",
  language: "",
  user: "", // Initialize user as an empty string
};

function AddPhrase() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Retrieve userId from AsyncStorage
        if (userId) {
          setFormData((prevData) => ({
            ...prevData,
            user: userId, // Set userId to formData
          }));
        } else {
          toast.error("User ID not found. Please log in again.");
          navigate("/login"); // Redirect to login if userId is not found
        }
      } catch (error) {
        console.error("Failed to get user ID from AsyncStorage:", error);
      }
    };

    getUserId(); // Call the function to retrieve userId
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/phrasebook/add", formData);
      console.log(response.data);
      toast.success("Phrase added successfully!");
      setFormData(initialState);
      navigate("/phrasebook/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add phrase");
    }
  };

  const validateForm = () => {
    const { phrase, translation, language } = formData;

    if (!phrase || !translation || !language) {
      toast.error("All fields are required.");
      return false;
    }

    const isEnglish = /^[a-zA-Z\s]+$/;
    const isSinhala = /^[\u0D80-\u0DFF\s]+$/;

    // Validate Sinhala to English or English to Sinhala translation
    if (isSinhala.test(phrase) && isEnglish.test(translation)) {
      return true; // Sinhala to English is valid
    }
    return true;
  };

  // Inline styles for the main container
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const sidebarStyle = {
    width: '250px', // Set the width of the sidebar
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
    padding: '0px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)',
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    zIndex: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <Sidebar />
      </div>
      <div style={contentStyle}>
        <div style={overlayStyle}></div>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', zIndex: 1 }}>
          <h2 className="text-center mb-4">Add New Phrase</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phrase" className="form-label">Phrase</label>
              <input
                type="text"
                className="form-control"
                id="phrase"
                name="phrase"
                value={formData.phrase}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="translation" className="form-label">Translation</label>
              <input
                type="text"
                className="form-control"
                id="translation"
                name="translation"
                value={formData.translation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="language" className="form-label">Language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Add Phrase</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddPhrase;
