import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTranslationForm = ({ translation, setSelectedTranslation }) => {
  const [updatedText, setUpdatedText] = useState(translation.text);
  const [updatedTranslatedText, setUpdatedTranslatedText] = useState(translation.translatedText);

  useEffect(() => {
    // Function to handle translation when text is updated
    const fetchTranslatedText = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/translate', {
          text: updatedText, // Pass the updated text
          from: 'si', // Update according to your needs (from language)
          to: 'en'   // Update according to your needs (to language)
        });
        
        setUpdatedTranslatedText(response.data.translatedText);
      } catch (error) {
        console.error('Error fetching translated text:', error);
      }
    };

    // Call the API every time updatedText changes
    if (updatedText) {
      fetchTranslatedText();
    }
  }, [updatedText]);

  const handleUpdate = () => {
    // Send updated translation to backend for saving
    axios.put(`http://localhost:5000/api/translations/${translation._id}`, {
      text: updatedText,
      translatedText: updatedTranslatedText
    })
      .then(response => {
        setSelectedTranslation(null);
        console.log('Updated translation:', response.data);
      })
      .catch(error => console.error('Error updating translation:', error));
  };

  return (
    <div className="modal-content">
      <h3>Edit Translation</h3>
      <label>
        Text:
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          style={{ width: '100%', padding: '10px' }}
        />
      </label>
      <br />
      <label>
        Translated Text:
        <input
          type="text"
          value={updatedTranslatedText}
          onChange={(e) => setUpdatedTranslatedText(e.target.value)}
          style={{ width: '100%', padding: '10px' }}
          readOnly
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => setSelectedTranslation(null)}>Cancel</button>
    </div>
  );
};

export default EditTranslationForm;
