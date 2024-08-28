import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import '../Home/main.css'
const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationOptions, setTranslationOptions] = useState({});
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');

  // const handleTranslate = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/translate', {
  //       text,
  //       from: fromLanguage,
  //       to: toLanguage,
  //     });

  //     if (response.data.possibleTranslations) {
  //       setTranslationOptions(response.data.possibleTranslations);
  //     } else {
  //       setTranslatedText(response.data.translatedText);
  //       setTranslationOptions({});
  //     }
  //   } catch (error) {
  //     console.error('Translation failed:', error);
  //   }
  // };

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text,
        from: fromLanguage,
        to: toLanguage,
      });
  
      if (response.data.translatedText) {
        setTranslatedText(response.data.translatedText);
        
      }
  
      if (response.data.possibleTranslations) {
        setTranslationOptions(response.data.possibleTranslations);
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
  
  return (
    <div>
      <nav className="navbar">
        <NavBar />
      </nav>
      {/*
      <h2>Language Translator</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div>
        <label>From Language</label>
        <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
          <option value="si">Sinhala</option>
          <option value="en">English</option>
        </select>
      </div>
      <div>
        <label>To Language</label>
        <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="si">Sinhala</option>
        </select>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <div>
  <h3>Translated Text</h3>
  {Object.keys(translationOptions).length > 0 ? (
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
  <p>{translatedText}</p>
</div>


*/}

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
          style={{marginLeft:'30px'}}
          
        />
      </div>
      <button className="translate-button" onClick={handleTranslate} style={{width:'25%'}}>
        Translate
      </button>

      {Object.keys(translationOptions).length > 0 ? (
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
    </div>



    </div>
  );
};

export default Translator;
