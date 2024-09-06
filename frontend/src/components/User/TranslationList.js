import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTranslationForm from './EditTranslationForm';
import NavBar from '../Home/Navbar';
import "./translator.css";


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
                  <button onClick={() => setSelectedTranslation(translation)} style={{ marginRight: '5px' }}>Edit</button>
                  <button onClick={() => deleteTranslation(translation._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedTranslation && (
          <EditTranslationForm
            translation={selectedTranslation}
            setSelectedTranslation={setSelectedTranslation}
          />
        )}
      </div>
    </div>
      );
    };

export default TranslationList;