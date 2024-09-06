import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTranslationForm from './EditTranslationForm';

const TranslationList = () => {
const [translations, setTranslations] = useState([]);
const [selectedTranslation, setSelectedTranslation] = useState(null);

  // Fetch translations from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/translations')
      .then(response => {
        console.log('Fetched Translations:', response.data);
        setTranslations(response.data);
      })
      .catch(error => console.error('Error fetching translations:', error));
  }, []);

    // Delete a translation
    const deleteTranslation = (id) => {
        axios.delete(`http://localhost:5000/api/translations/${id}`)
          .then(() => {
            setTranslations(translations.filter(t => t._id !== id));
          })
          .catch(error => console.error('Error deleting translation:', error));
      };

      return (
        <div>
          <h2>Translations</h2>
          {translations.map(translation => (
            <div key={translation._id}>
              <p>{translation.text} - {translation.translatedText}</p>
              <button onClick={() => setSelectedTranslation(translation)}>Edit</button>
              <button onClick={() => deleteTranslation(translation._id)}>Delete</button>
            </div>
          ))}
          {selectedTranslation && <EditTranslationForm translation={selectedTranslation} setSelectedTranslation={setSelectedTranslation} />}
        </div>
      );
    };

export default TranslationList;