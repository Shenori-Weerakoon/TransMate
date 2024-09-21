import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import '../Home/main.css';
import shortFormDictionary from './shortForms';  // Import the short form dictionary

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationOptions, setTranslationOptions] = useState({});
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');
  const [grammarErrors, setGrammarErrors] = useState([]);

  // Function to correct short forms
  const correctShortForms = (inputText) => {
    let correctedText = inputText;

    // Replace short forms in the text
    Object.keys(shortFormDictionary).forEach((shortForm) => {
      const regex = new RegExp(`\\b${shortForm}\\b`, 'gi'); // Match full word
      correctedText = correctedText.replace(regex, shortFormDictionary[shortForm]);
    });

    return correctedText;
  };

  const handleTranslate = async () => {
    try {
      let processedText = text;

      // Only correct short forms if translating from English
      if (fromLanguage === 'en') {
        processedText = correctShortForms(text);
        setText(processedText); // Update the text with corrected short forms
      }

      const response = await axios.post('http://localhost:5000/api/translate', {
        text: processedText,
        from: fromLanguage,
        to: toLanguage,
      });

      if (response.data.translatedText) {
        setTranslatedText(response.data.translatedText);
      }

      if (response.data.possibleTranslations) {
        setTranslationOptions(response.data.possibleTranslations);
      }

      if (response.data.grammarErrors) {
        setGrammarErrors(response.data.grammarErrors);
      }

      console.log(translatedText);
      console.log(translationOptions);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleSwapLanguages = () => {
    setFromLanguage((prev) => (prev === 'si' ? 'en' : 'si'));
    setToLanguage((prev) => (prev === 'en' ? 'si' : 'en'));
    setText('');
    setTranslatedText('');
  };

  const highlightErrors = () => {
    let highlightedText = text;

    grammarErrors.forEach((error) => {
      const errorText = highlightedText.slice(error.offset, error.offset + error.length);
      highlightedText = highlightedText.replace(
        errorText,
        `<span className="grammar-error" title="${error.message}">${errorText}</span>`
      );
    });

    return { __html: highlightedText };
  };

  return (
    <div>
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="translator-container">
        <div className="language-selection">
          <button className="language-button">{fromLanguage}</button>
          <div className="swap-icon" onClick={handleSwapLanguages}>
            ⇆
          </div>
          <button className="language-button">{toLanguage}</button>
        </div>
        <div className="translation-section">
          <textarea
            className="feature-box"
            placeholder={`Enter something in ${fromLanguage}...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <textarea
            className="feature-box"
            placeholder={`Translating to ${toLanguage}...`}
            value={translatedText}
            readOnly
            style={{ marginLeft: '30px' }}
          />
        </div>
        <button className="translate-button" onClick={handleTranslate}>
          Translate
        </button>

        {fromLanguage === 'si' && Object.keys(translationOptions).length > 0 ? (
          <ul>
            {Object.entries(translationOptions).map(([word, options], index) => (
              <li key={index}>
                <strong>{word}:</strong> {options.join(', ')}
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}

        {fromLanguage === 'en' && grammarErrors.length > 0 && (
          <div className="highlighted-text" dangerouslySetInnerHTML={highlightErrors()} />
        )}
      </div>
    </div>
  );
};

export default Translator;
