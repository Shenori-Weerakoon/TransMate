import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddToDictionary.css';


const AddToDictionary = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sinhalaWord: "",
    englishWords: ["", "", ""],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "englishWords") {
      const newWords = [...formData.englishWords];
      newWords[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        englishWords: newWords,
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
    if (!data.sinhalaWord.trim()) errors.sinhalaWord = "Sinhala word is required";
    if (!data.englishWords[0].trim()) errors.englishWords = "At least one English word is required";
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
          navigate(-1); // Navigate back to the previous page
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
        <Form.Group controlId="sinhalaWord" className="mb-4">
          <Form.Label>Sinhala Word : </Form.Label>
          <Form.Control
            type="text"
            name="sinhalaWord"
            value={formData.sinhalaWord}
            onChange={(e) => handleChange(e, null)}
            isInvalid={!!errors.sinhalaWord}
            placeholder="Enter Sinhala word"
          />
          <Form.Control.Feedback type="invalid">{errors.sinhalaWord}</Form.Control.Feedback>
        </Form.Group>

        {formData.englishWords.map((word, index) => (
          <Form.Group controlId={`englishWord${index}`} className="mb-4" key={index}>
            <Form.Label>English Word {index + 1} : </Form.Label>
            <Form.Control
              type="text"
              name="englishWords"
              value={word}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Enter English word ${index + 1}`}
              isInvalid={index === 0 && !!errors.englishWords} // Only apply error for the first input if needed
            />
            {index === 0 && <Form.Control.Feedback type="invalid">{errors.englishWords}</Form.Control.Feedback>}
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