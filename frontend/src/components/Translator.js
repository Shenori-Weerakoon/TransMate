import React, { useState } from 'react';
import axios from 'axios';
//import '../components/styles/main.css';

const Translator = () => {
  const [text, setText] = useState(''); //input text
  const [translatedText, setTranslatedText] = useState(''); //output text
  const [fromLanguage, setFromLanguage] = useState('si'); //source language
  const [toLanguage, setToLanguage] = useState('en'); //target language

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text,
        from: fromLanguage,
        to: toLanguage,
      });
      setTranslatedText(response.data.translatedText);
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

  return (
    <div className="translator-container">
      <div className="language-selection">
        <button className="language-button">{fromLanguage}</button>
        <div className="swap-icon" onClick={handleSwapLanguages}>⇆</div>
        <button className="language-button">{toLanguage}</button>
      </div>
      <div className="translation-section">
        <textarea
          className="input-text"
          placeholder={`Enter something in ${fromLanguage}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          className="output-text"
          placeholder={`Translating to ${toLanguage}...`}
          value={translatedText}
          readOnly
        />
      </div>
      <button className="translate-button" onClick={handleTranslate}>
        Translate
      </button>
    </div>
  );
};

export default Translator;
