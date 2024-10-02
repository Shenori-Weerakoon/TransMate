{/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import '../Home/main.css';

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationOptions, setTranslationOptions] = useState({});
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [shortFormDictionary, setShortFormDictionary] = useState({});

  useEffect(() => {
    const fetchShortForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/words/accepted/shortforms');
        const acceptedShortForms = {};

        response.data.data.forEach((entry) => {
          acceptedShortForms[entry.shortForm] = entry.fullForm;  // Only map approved short forms
        });

        setShortFormDictionary(acceptedShortForms);
      } catch (error) {
        console.error('Error fetching short forms:', error);
      }
    };

    if (fromLanguage === 'en') {
      fetchShortForms(); // Only fetch when translating from English
    }
  }, [fromLanguage]);

  const correctShortForms = (inputText) => {
    let correctedText = inputText;

    Object.keys(shortFormDictionary).forEach((shortForm) => {
      const regex = new RegExp(`\\b${shortForm}\\b`, 'gi');
      correctedText = correctedText.replace(regex, shortFormDictionary[shortForm]);
    });

    return correctedText;
  };

  const checkGrammar = async (inputText) => {
    try {
      const response = await axios.post('http://localhost:5000/api/grammarcheck', { text: inputText });
      return response.data.grammarErrors || [];
    } catch (error) {
      console.error('Grammar check failed:', error);
      return [];
    }
  };

  const handleTranslate = async () => {
    try {
      let processedText = text;

      if (fromLanguage === 'en') {
        processedText = correctShortForms(text);
        setText(processedText);

        const grammarCheckResult = await checkGrammar(processedText);
        setGrammarErrors(grammarCheckResult);
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

    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleSwapLanguages = () => {
    setFromLanguage((prev) => (prev === 'si' ? 'en' : 'si'));
    setToLanguage((prev) => (prev === 'en' ? 'si' : 'en'));
    setText('');
    setTranslatedText('');
    setGrammarErrors([]);
  };

  const highlightErrors = () => {
    let highlightedText = text;

    grammarErrors.forEach((error) => {
      const errorText = highlightedText.slice(error.offset, error.offset + error.length);
      const highlightedError = `<span class="grammar-error" title="${error.message}">${errorText}</span>`;
      highlightedText = highlightedText.replace(errorText, highlightedError);
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
          <div>
            <div className="highlighted-text" dangerouslySetInnerHTML={highlightErrors()} />
            <div>
              <p>Grammar issues found:</p>
              <ul>
                {grammarErrors.map((error, index) => (
                  <li key={index} style={{ color: 'red' }}>
                    {error.message} (at position {error.offset})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
*/}


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import '../Home/main.css';

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationOptions, setTranslationOptions] = useState({});
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [shortFormDictionary, setShortFormDictionary] = useState({});

  useEffect(() => {
    const fetchShortForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/words/accepted/shortforms');
        const acceptedShortForms = {};

        response.data.data.forEach((entry) => {
          acceptedShortForms[entry.shortForm] = entry.fullForm;  // Only map approved short forms
        });

        setShortFormDictionary(acceptedShortForms);
      } catch (error) {
        console.error('Error fetching short forms:', error);
      }
    };

    if (fromLanguage === 'en') {
      fetchShortForms(); // Only fetch when translating from English
    }
  }, [fromLanguage]);

  const correctShortForms = (inputText) => {
    let correctedText = inputText;

    Object.keys(shortFormDictionary).forEach((shortForm) => {
      const regex = new RegExp(`\\b${shortForm}\\b`, 'gi');
      correctedText = correctedText.replace(regex, shortFormDictionary[shortForm]);
    });

    return correctedText;
  };

  const checkGrammar = async (inputText) => {
    try {
      const response = await axios.post('http://localhost:5000/api/grammarcheck', { text: inputText });
      return response.data.grammarErrors || [];
    } catch (error) {
      console.error('Grammar check failed:', error);
      return [];
    }
  };

  const handleTranslate = async () => {
    try {
      let processedText = text;

      if (fromLanguage === 'en') {
        processedText = correctShortForms(text);
        setText(processedText);

        const grammarCheckResult = await checkGrammar(processedText);
        setGrammarErrors(grammarCheckResult);
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

    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleSwapLanguages = () => {
    setFromLanguage((prev) => (prev === 'si' ? 'en' : 'si'));
    setToLanguage((prev) => (prev === 'en' ? 'si' : 'en'));
    setText('');
    setTranslatedText('');
    setGrammarErrors([]);
  };

  // Function to highlight grammar errors in the input text
  const highlightErrors = () => {
    let highlightedText = text;

    grammarErrors.forEach((error) => {
      const errorText = highlightedText.slice(error.offset, error.offset + error.length);
      const highlightedError = `<span class="grammar-error" title="${error.message}">${errorText}</span>`;
      highlightedText = highlightedText.replace(errorText, highlightedError);
    });

    return { __html: highlightedText };
  };

  // Highlight specific words in the list of grammar errors
  const highlightErrorInList = (error) => {
    const errorText = text.slice(error.offset, error.offset + error.length);
    return (
      <span style={{ color: 'red', fontWeight: 'bold' }}>
        {errorText}
      </span>
    );
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
          <div>
           
            <div className="highlighted-text" dangerouslySetInnerHTML={highlightErrors()} />

         
            <div>
              <p>Grammar issues found:</p>
              <ul>
                {grammarErrors.map((error, index) => (
                  <li key={index}>
                    {highlightErrorInList(error)} - {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;

*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import '../Home/main.css';

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationOptions, setTranslationOptions] = useState({});
  const [fromLanguage, setFromLanguage] = useState('si');
  const [toLanguage, setToLanguage] = useState('en');
  const [grammarErrors, setGrammarErrors] = useState([]);
  const [shortFormDictionary, setShortFormDictionary] = useState({});

  useEffect(() => {
    const fetchShortForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/words/accepted/shortforms');
        const acceptedShortForms = {};

        response.data.data.forEach((entry) => {
          acceptedShortForms[entry.shortForm] = entry.fullForm;  // Only map approved short forms
        });

        setShortFormDictionary(acceptedShortForms);
      } catch (error) {
        console.error('Error fetching short forms:', error);
      }
    };

    if (fromLanguage === 'en') {
      fetchShortForms(); // Only fetch when translating from English
    }
  }, [fromLanguage]);

  const correctShortForms = (inputText) => {
    let correctedText = inputText;

    Object.keys(shortFormDictionary).forEach((shortForm) => {
      const regex = new RegExp(`\\b${shortForm}\\b`, 'gi');
      correctedText = correctedText.replace(regex, shortFormDictionary[shortForm]);
    });

    return correctedText;
  };

  const checkGrammar = async (inputText) => {
    try {
      const response = await axios.post('http://localhost:5000/api/grammarcheck', { text: inputText });
      return response.data.grammarErrors || [];
    } catch (error) {
      console.error('Grammar check failed:', error);
      return [];
    }
  };

  const handleTranslate = async () => {
    try {
      let processedText = text;

      if (fromLanguage === 'en') {
        processedText = correctShortForms(text);
        setText(processedText);

        const grammarCheckResult = await checkGrammar(processedText);
        setGrammarErrors(grammarCheckResult);
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

    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  const handleSwapLanguages = () => {
    setFromLanguage((prev) => (prev === 'si' ? 'en' : 'si'));
    setToLanguage((prev) => (prev === 'en' ? 'si' : 'en'));
    setText('');
    setTranslatedText('');
    setGrammarErrors([]);
  };

  // Highlight specific words in the list of grammar errors
  const highlightErrorInList = (error) => {
    const errorText = text.slice(error.offset, error.offset + error.length);
    return (
      <span style={{ color: 'red', fontWeight: 'bold' }}>
        {errorText}
      </span>
    );
  };

  return (
    <div className="body">
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="translator-container">
        <div className="container-header">
          Get A quick, <br /> free translation
        </div>
          

          <div className="language-selection">
          <span className="language-label">{fromLanguage}</span>
            <div className="swap-icon" onClick={handleSwapLanguages}>
               ⇆
            </div>
          <span className="language-label">{toLanguage}</span>
          </div>
        <div className="translation-section">
          <textarea
            className="textbox"
            placeholder={"Type Your Text Here.."}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <textarea
            className="textbox"
            placeholder={"Translation"}
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
          <div>
            {/* Display grammar errors in list view without any extra HTML rendering */}
            <div>
              <p>Grammar issues found:</p>
              <ul>
                {grammarErrors.map((error, index) => (
                  <li key={index}>
                    {highlightErrorInList(error)} - {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
