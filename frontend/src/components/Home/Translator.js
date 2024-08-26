import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';


const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');

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

  return (
    <div>
      <nav className="navbar">
      <NavBar />
        {/*<div className="navbar-brand">
          <h2>Sinhala to English Translator</h2>
        </div>
        <div className="navbar-links">
        <Link to="/">Home</Link>
          <Link to="/translator">Translator</Link>
          <Link to="/dictionary">Dictionary</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>*/}
      </nav>
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
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default Translator;