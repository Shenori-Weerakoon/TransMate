/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Home/Navbar';
import "./translator.css"; // Ensure you have CSS for styling the modal

const TranslationList = () => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedTranslatedText, setUpdatedTranslatedText] = useState('');

  // Fetch translations from the backend
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/translations');
        console.log('Fetched Translations:', response.data);
        setTranslations(response.data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, []);

  // Delete a translation
  const deleteTranslation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/translations/${id}`);
      setTranslations(translations.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting translation:', error);
    }
  };

  // Update a translation
  const handleUpdate = async () => {
    if (selectedTranslation) {
      try {
        const response = await axios.put(`http://localhost:5000/api/translations/${selectedTranslation._id}`, {
          text: updatedText,
          translatedText: updatedTranslatedText,
        });

        // Update the existing translation in the state
        const updatedTranslations = translations.map((translation) =>
          translation._id === selectedTranslation._id ? response.data : translation
        );

        setTranslations(updatedTranslations); // This replaces the old entry
        setSelectedTranslation(null); // Close the edit form after updating
      } catch (error) {
        console.error('Error updating translation:', error);
      }
    }
  };

  // Open the edit form with the current text
  const handleEdit = (translation) => {
    setSelectedTranslation(translation);
    setUpdatedText(translation.text);
    setUpdatedTranslatedText(translation.translatedText);
  };

  // Handle text input change
  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // Translate the updated text using the Microsoft Translator API
  const handleTranslate = async () => {
    const targetLanguage = /^[\u0D80-\u0DFF]+$/.test(updatedText) ? 'en' : 'si'; // Determine target language based on input
    const fromLanguage = targetLanguage === 'en' ? 'si' : 'en'; // Set from language

    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text: updatedText,
        from: fromLanguage,
        to: targetLanguage,
      });

      console.log('Translation Response:', response.data); // Debug response
      setUpdatedTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <nav style={{ width: '100%', backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
        <NavBar />
      </nav>
      <div style={{ padding: '20px' }}>
        <h2>Translations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Original Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Translated Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {translations.map(translation => (
              <tr key={translation._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.text}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.translatedText}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleEdit(translation)} style={{ marginRight: '5px' }}>Edit</button>
                  <button onClick={() => deleteTranslation(translation._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTranslation && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Translation</h3>
              <label>
                Text:
                <input
                  type="text"
                  value={updatedText}
                  onChange={handleTextChange}
                />
              </label>
              <br />
              <label>
                Translated Text:
                <input
                  type="text"
                  value={updatedTranslatedText}
                  readOnly
                />
              </label>
              <br />
              <button onClick={handleTranslate}>Translate</button>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setSelectedTranslation(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationList;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Home/Navbar';
import "./translator.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const TranslationList = () => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedTranslatedText, setUpdatedTranslatedText] = useState('');

  // Fetch translations from the backend
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/translations');
        console.log('Fetched Translations:', response.data);
        setTranslations(response.data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, []);

  // Delete a translation
  const deleteTranslation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/translations/${id}`);
      setTranslations(translations.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting translation:', error);
    }
  };

  // Update a translation
  const handleUpdate = async () => {
    if (selectedTranslation) {
      try {
        const response = await axios.put(`http://localhost:5000/api/translations/${selectedTranslation._id}`, {
          text: updatedText,
          translatedText: updatedTranslatedText,
        });

        // Update the existing translation in the state
        const updatedTranslations = translations.map((translation) =>
          translation._id === selectedTranslation._id ? response.data : translation
        );

        setTranslations(updatedTranslations); // This replaces the old entry
        setSelectedTranslation(null); // Close the edit form after updating
        setUpdatedText(''); // Clear updatedText
        setUpdatedTranslatedText(''); // Clear updatedTranslatedText
      } catch (error) {
        console.error('Error updating translation:', error);
      }
    }
  };

  // Open the edit form with the current text
  const handleEdit = (translation) => {
    setSelectedTranslation(translation);
    setUpdatedText(translation.text);
    setUpdatedTranslatedText(translation.translatedText);
  };

  // Handle text input change
  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // Translate the updated text using the Microsoft Translator API
  const handleTranslate = async () => {
    const targetLanguage = /^[\u0D80-\u0DFF]+$/.test(updatedText) ? 'en' : 'si'; // Determine target language based on input
    const fromLanguage = targetLanguage === 'en' ? 'si' : 'en'; // Set from language

    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text: updatedText,
        from: fromLanguage,
        to: targetLanguage,
      });

      console.log('Translation Response:', response.data); // Debug response
      setUpdatedTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <nav style={{ width: '100%', backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
        <NavBar />
      </nav>
      <div style={{ padding: '20px' }}>
        <h2>Translations</h2>
        <table className="translation-table" style={{ width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Original Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Translated Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {translations.map(translation => (
              <tr key={translation._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.text}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.translatedText}</td>
                <td style={{ border: '1px solid #ddd', padding: '18px'}}>
                <button onClick={() => handleEdit(translation)}>
                  <i className="fas fa-pen"></i>
                </button>
                <button onClick={() => deleteTranslation(translation._id)}><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for editing translation */}
        {selectedTranslation && (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit Translation</h3>
              <label>
                Text:
                <input
                  type="text"
                  value={updatedText}
                  onChange={handleTextChange}
                />
              </label>
              <br />
              <label>
                Translated Text:
                <input
                  type="text"
                  value={updatedTranslatedText}
                  readOnly
                />
              </label>
              <br />
              <button onClick={handleTranslate}>Translate</button>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => {
                setSelectedTranslation(null); // Close modal
                setUpdatedText(''); // Clear updatedText
                setUpdatedTranslatedText(''); // Clear updatedTranslatedText
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationList;



