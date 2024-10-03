// components/EditPhrase.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./SideBar"; // Import Sidebar

function EditPhrase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phrase: "",
    translation: "",
    language: "",
    user: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserIdAndPhrase = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          toast.error("User ID not found. Please log in again.");
          navigate("/login");
          return;
        }

        setFormData((prevData) => ({ ...prevData, user: userId }));

        if (!id) {
          console.error("No phrase ID provided");
          toast.error("No phrase ID provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/phrasebook/get/${id}`, {
          params: { user: userId },
        });

        const phraseData = response.data;
        setFormData({
          phrase: phraseData.phrase,
          translation: phraseData.translation,
          language: phraseData.language,
          user: phraseData.user,
        });
      } catch (error) {
        console.error("Error fetching phrase details:", error.response?.data?.error || error.message);
        toast.error("Failed to fetch phrase details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndPhrase();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const updatedData = { ...formData, user: userId };
      await axios.put(`http://localhost:5000/phrasebook/update/${id}`, updatedData);
      toast.success("Phrase details updated successfully!");
      navigate("/phrasebook/");
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      toast.error("Failed to update phrase details");
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

    if (isSinhala.test(phrase) && isEnglish.test(translation)) {
      return true;
    }
    return true;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Inline styles for the main container
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)',
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <Sidebar />
      </div>
      <div style={contentStyle}>
        <div style={overlayStyle}></div>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', position: 'relative', zIndex: 1 }}>
          <h2 className="text-center mb-4">Edit Phrase</h2>
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
                style={{ backgroundColor: 'white', color: 'black' }} // Ensure white background and black text
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
                style={{ backgroundColor: 'white', color: 'black' }} // Ensure white background and black text
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
                style={{ backgroundColor: 'white', color: 'black' }} // Ensure white background and black text
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Update Phrase</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditPhrase;
