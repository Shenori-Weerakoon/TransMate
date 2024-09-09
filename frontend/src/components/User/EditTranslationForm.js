// components/EditTranslationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditTranslationForm = ({ translation, setSelectedTranslation }) => {
  const [text, setText] = useState(translation.text);
  const [translatedText, setTranslatedText] = useState(translation.translatedText);

  // Update a translation
  const updateTranslation = (e) => {
    e.preventDefault();
    axios.put(`/api/translations/${translation._id}`, { text, translatedText })
      .then(response => {
        console.log('Translation updated:', response.data);
        setSelectedTranslation(null); // Close the form after update
      })
      .catch(error => console.error('Error updating translation:', error));
  };

  return (
    <form onSubmit={updateTranslation}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="text" value={translatedText} onChange={(e) => setTranslatedText(e.target.value)} />
      <button type="submit">Update</button>
      <button onClick={() => setSelectedTranslation(null)}>Cancel</button>
    </form>
  );
};

export default EditTranslationForm;
