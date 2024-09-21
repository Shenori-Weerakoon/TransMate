import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './AddToDictionary.css';


const EditDictionary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sinhalaWord: "",
    englishWords: ["", "", ""],
  });

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sinhala-dictionary/getWord/${id}`);
        const fetchedWord = response.data;
  
        // Ensure that englishWords has at least 3 elements
        const updatedEnglishWords = [...fetchedWord.englishWords, "", ""].slice(0, 3);
  
        setFormData({
          sinhalaWord: fetchedWord.sinhalaWord,
          englishWords: updatedEnglishWords
        });
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };
  
    fetchWord();
  }, [id]);  

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
        await axios.put(`http://localhost:5000/api/sinhala-dictionary/updateWord/${id}`, {
          sinhalaWord: formData.sinhalaWord,
          englishWords: formData.englishWords.filter(word => word.trim() !== ''),  // Filter out empty words
          status: formData.englishWords.map(() => "pending") // Set all statuses to pending
        });
        toast.success('Word updated successfully!');
        setTimeout(() => {
          navigate('/admin');  // Navigate back to the dictionary page
        }, 1000);
      } catch (error) {
        console.error("Error updating word:", error);
        toast.error(`Error updating word: ${error.response?.data?.message || error.message}`);
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
      <h2>Edit Dictionary Entry</h2>
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
              isInvalid={index === 0 && !!errors.englishWords}
            />
            {index === 0 && <Form.Control.Feedback type="invalid">{errors.englishWords}</Form.Control.Feedback>}
          </Form.Group>
        ))}

        <div className="submit-button-container">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Word'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditDictionary;