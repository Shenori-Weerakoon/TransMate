import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Home/Navbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NotoSansSinhalaBase64 from './NotoSansSinhalaBase64';
import "./translator.css"; // Ensure you have CSS for styling

const TranslationList = () => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedTranslatedText, setUpdatedTranslatedText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
        setSelectedTranslation(null); // Clear selected translation after updating
        //setUpdatedText(''); // Clear updatedText
        //setUpdatedTranslatedText(''); // Clear updatedTranslatedText
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
    console.log('Selected Translation:', translation);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTranslations = translations.filter((translation) =>
    translation.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    translation.translatedText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF Report for last 15 translations
  const generatePDFReport = () => {
    const doc = new jsPDF();
  const recentTranslations = translations.slice(-15); // Get last 15 translations

  // Set Noto Sans Sinhala font using Base64
  doc.addFileToVFS('NotoSansSinhala.ttf', NotoSansSinhalaBase64); 
  doc.addFont('NotoSansSinhala.ttf', 'NotoSansSinhala', 'normal');
  doc.setFont('NotoSansSinhala', 'normal');

  // Add title with Sinhala font
  doc.setFontSize(18);
  doc.text('Recent Translations', 14, 22);

  // Use autoTable plugin for proper table formatting
  doc.autoTable({
    head: [['Original Text', 'Translated Text']], // Table headers
    body: recentTranslations.map((translation) => [
      translation.text,           // Original Text (Sinhala or English)
      translation.translatedText, // Translated Text (Sinhala or English)
    ]),
    startY: 30, // Set where the table starts in PDF
    theme: 'grid', // Add table grid style
    styles: { font: 'NotoSansSinhala' }, // Set the font for the table content
  });

  // Save the generated PDF
  doc.save('recent_translations_report.pdf');
  };

  return (
    <div style={{ height: '100vh' }}>
      <nav className="navbar">
        <NavBar />
      </nav>
      <div style={{ padding: '20px' }}>
        <h2>Translations</h2>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search translations..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '10px', marginBottom: '20px', width: '30%' }}
        />

        {/* PDF Generation Button */}
        <button className="download-button" onClick={generatePDFReport} style={{ margin: '20px', padding: '10px 20px', width: '100px', background: 'blue' }}>
          Download
        </button>

        <table style={{ width: '80%', borderCollapse: 'collapse', margin:'auto' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Original Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Translated Text</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', width: '250px', alignItems: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>

            {filteredTranslations.map(translation => (
              <tr key={translation._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.text}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{translation.translatedText}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', marginLeft: '8px' }}>
                  <button className="save-button" onClick={() => handleEdit(translation)}>Edit</button>
                  <button className="cancel-button" onClick={() => deleteTranslation(translation._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form for editing translation below the table */}
        {selectedTranslation && (
          <div className="custom-modal">
            <div className="custom-modal-content" style={{ width: '600px', height: '400px' }}>
              <h3>Edit Translation</h3>
              <label>
                Text:
                <input className="modal-text-input"
                  type="text"
                  value={updatedText}
                  onChange={handleTextChange}
                  style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }}
                />
              </label>
              <br />
              <button className="translate-button" onClick={handleTranslate}>Translate</button>
              <br /><br />
              <label>
                Translated Text:
                <input className="modal-text-input"
                  type="text"
                  value={updatedTranslatedText}
                  readOnly
                />
              </label>
              <br />
              <button className="save-button" onClick={handleUpdate}>Save</button>
              <button className="cancel-button" onClick={() => {
                setSelectedTranslation(null); // Close form
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
