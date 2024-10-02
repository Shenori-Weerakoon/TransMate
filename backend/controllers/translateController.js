{/*const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Translation = require('../models/translation');
const SinhalaDictionary = require('../models/SinhalaDictionary');

const key = 'b8112fb382d14dd38409fb9fc4cfbb3e'; // Your API key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Microsoft Translator endpoint
const location = 'eastasia'; // Your Azure region

const translateText = async (req, res) => {
  const { text, from, to } = req.body;

  // Split text into words
  const words = text.split(/\s+/);

  try {
    const possibleTranslations = {};

    // Fetch possible translations for each word
    for (let word of words) {
      console.log(`Searching for word: ${word}`); // Debugging log

      // Search for the word in the Sinhala dictionary
      const dictionaryEntry = await SinhalaDictionary.findOne({ englishWord: word });

      if (dictionaryEntry) {
        console.log(`Found in dictionary: ${word}`); // Debugging log
        // Collect possible Sinhala meanings
        possibleTranslations[word] = dictionaryEntry.sinhalaMeanings;
      } else {
        console.log(`Not found in dictionary: ${word}`); // Debugging log
        // Placeholder or external API call if needed
        possibleTranslations[word] = ['No suggestions available'];
      }
    }

    // Translate the full text using Microsoft Translator API
    const response = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-Type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'from': from,
        'to': to
      },
      data: [{ 'text': text }],
      responseType: 'json'
    });

    console.log('Translation API response:', response.data); // Debugging log

    const translatedText = response.data[0].translations[0].text;

    // Save the translation in the database (optional)
    const translation = new Translation({
      text,
      translatedText,
      from,
      to
    });

    await translation.save();

    res.json({ translatedText, possibleTranslations });

  } catch (error) {
    console.error('Translation API Error:', error.message); // Debugging log
    res.status(500).json({ message: 'Translation failed', error: error.message });
  }
};

module.exports = { translateText };
*/}

{/*}
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Translation = require('../models/translation');
const SinhalaDictionary = require('../models/SinhalaDictionary');

const key = 'b8112fb382d14dd38409fb9fc4cfbb3e'; // Your API key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Microsoft Translator endpoint
const location = 'eastasia'; // Your Azure region

const translateText = async (req, res) => {
  const { text, from, to } = req.body;

  // Split text into words
  const words = text.split(/\s+/);

  try {
    const possibleTranslations = {};

    for (let word of words) {
      // Search for the word in the Sinhala dictionary
      const dictionaryEntry = await SinhalaDictionary.findOne({ sinhalaWord: word });

      if (dictionaryEntry) {
        // If the word exists in the dictionary, collect possible Sinhala meanings
        possibleTranslations[word] = dictionaryEntry.englishWords;
      } else {
        // If word not found, you can implement an external API call or use a placeholder
        possibleTranslations[word] = ['No suggestions available'];
      }
    }

    // Translate the full text using Microsoft Translator API
    const response = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-Type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'from': from,
        'to': to
      },
      data: [{ 'text': text }],
      responseType: 'json'
    });

    const translatedText = response.data[0].translations[0].text;
    console.log(translatedText);
    console.log(possibleTranslations);

    // Save the translation in your database (optional)
    const translation = new Translation({
      text,
      translatedText,
      from,
      to
    });

    await translation.save();

    
    res.json({
      
      possibleTranslations,
      translatedText,
    });

  } catch (error) {
    console.error('Translation API Error:', error.message);
    res.status(500).json({ message: 'Translation failed', error: error.message });
  }
};

module.exports = { translateText };
*/}

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Translation = require('../models/translation');
const SinhalaDictionary = require('../models/SinhalaDictionary');

const key = 'b8112fb382d14dd38409fb9fc4cfbb3e'; //  API key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Microsoft Translator endpoint
const location = 'eastasia'; //  Azure region

const translateText = async (req, res) => {
  const { text, from, to } = req.body;

  // Split text into words
  const words = text.split(/\s+/);

  try {
    const possibleTranslations = {};

    for (let word of words) {
      // Search for the word in the Sinhala dictionary
      const dictionaryEntry = await SinhalaDictionary.findOne({ sinhalaWord: word });

      if (dictionaryEntry) {
        // If the word exists in the dictionary, collect possible English meanings
        possibleTranslations[word] = dictionaryEntry.englishWords;
      } else {
       // If word not found in the dictionary, translate the word using Microsoft Translator API
       const translationResponse = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-Type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'si', // Sinhala language code
          'to': 'en' // English language code
        },
        data: [{ 'text': word }],
        responseType: 'json'
      });

      const translatedWord = translationResponse.data[0].translations[0].text;
      possibleTranslations[word] = [translatedWord];
      }
    }

    // Translate the full text using Microsoft Translator API
    const response = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-Type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'from': from,
        'to': to
      },
      data: [{ 'text': text }],
      responseType: 'json'
    });

    const translatedText = response.data[0].translations[0].text;

    let grammarErrors = [];
    if (from === 'en') { // Perform grammar check only if the original text is in English
      const grammarResponse = await axios.post('https://api.languagetool.org/v2/check', null, {
        params: {
          text: translatedText, // Check the translated text
          language: 'en-US'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const grammarData = grammarResponse.data;
      grammarErrors = grammarData.matches.map(match => ({
        message: match.message,
        replacements: match.replacements.map(replacement => replacement.value),
        context: match.context.text,
        offset: match.offset,
        length: match.length
      }));

      // Highlight grammar errors in the translated text
      grammarErrors.forEach(error => {
        const errorText = translatedText.substring(error.offset, error.offset + error.length);
        const suggestions = error.replacements.join(', ');
        translatedText = translatedText.replace(errorText, `[${errorText} (Suggestions: ${suggestions})]`);
      });
    }

    // Save or update translation in the database
    let translation = await Translation.findOne({ text, from, to });

    if (!translation) {
      console.log(`Creating new translation for text: ${text}`);
      translation = new Translation({
        text,
        translatedText,
        from,
        to
      });
    } else {
      console.log(`Updating existing translation for text: ${text}`);
      translation.translatedText = translatedText; // Only update the translation
    }

    await translation.save();

    res.json({
      possibleTranslations,
      translatedText,
      grammarErrors
    });

  } catch (error) {
    console.error('Translation API Error:', error.message);
    res.status(500).json({ message: 'Translation failed', error: error.message });
  }
};

//read all translation history
const getTranslations = async (req, res) => {
  try {
    const translations = await Translation.find();
    console.log('Fetched Translations:', translations);
    res.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error.message);
    res.status(500).json({ message: 'Failed to fetch translations' });
  }
};

// Update translation
const updateTranslation = async (req, res) => {
  const { id } = req.params;
  const { text, translatedText } = req.body;

  try {
    const updatedTranslation = await Translation.findByIdAndUpdate(
      id,
      { text, translatedText },
      { new: true }
    );
    res.json(updatedTranslation);
  } catch (error) {
    console.error('Error updating translation:', error.message);
    res.status(500).json({ message: 'Failed to update translation' });
  }
};

// Delete translation
const deleteTranslation = async (req, res) => {
  const { id } = req.params;

  try {
    await Translation.findByIdAndDelete(id);
    res.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    console.error('Error deleting translation:', error.message);
    res.status(500).json({ message: 'Failed to delete translation' });
  }
};

module.exports = { translateText, getTranslations, updateTranslation, deleteTranslation };

