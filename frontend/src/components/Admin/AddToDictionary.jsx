import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddToDictionary.css'; // Import custom CSS

const AddToDictionary = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    englishWord: "",
    sinhalaMeanings: ["", "", ""],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "sinhalaMeanings") {
      const newMeanings = [...formData.sinhalaMeanings];
      newMeanings[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        sinhalaMeanings: newMeanings,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.englishWord.trim()) errors.englishWord = "English word is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsObj = validateForm(formData);
    if (Object.keys(errorsObj).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/sinhala-dictionary/addWord', formData);
        console.log(response.data);
        toast.success('Word added successfully!');
        setTimeout(() => {
          navigate("#SinhalaDictionary");
        }, 1000);
      } catch (error) {
        console.error("Error adding word:", error.response?.data || error.message);
        toast.error(`Error adding word: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(errorsObj);
    }
  };

  return (
    <div className="container mt-5"><br/><br/>
      <div className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/admin')} />
      </div>
      <h2>Add to Dictionary</h2>
      <Form onSubmit={handleSubmit} className="dictionary-form">
        <Form.Group controlId="englishWord" className="mb-4">
          <Form.Label>English Word : </Form.Label>
          <Form.Control
            type="text"
            name="englishWord"
            value={formData.englishWord}
            onChange={handleChange}
            isInvalid={!!errors.englishWord}
            placeholder="Enter English word"
          />
          <Form.Control.Feedback type="invalid">{errors.englishWord}</Form.Control.Feedback>
        </Form.Group>

        {formData.sinhalaMeanings.map((meaning, index) => (
          <Form.Group controlId={`sinhalaMeaning${index}`} className="mb-4" key={index}>
            <Form.Label>Sinhala Meaning {index + 1} (Optional) : </Form.Label>
            <Form.Control
              type="text"
              name="sinhalaMeanings"
              value={meaning}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Enter Sinhala meaning ${index + 1}`}
            />
          </Form.Group>
        ))}

        <div className="submit-button-container">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Word'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddToDictionary;