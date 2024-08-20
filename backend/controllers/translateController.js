const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Translation = require('../models/translation');

const key = 'b8112fb382d14dd38409fb9fc4cfbb3e'; // Your API key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Microsoft Translator endpoint
const location = 'eastasia'; // Your Azure region

const translateText = async (req, res) => {
  const { text, from, to } = req.body;

  try {
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
      data: [{
        'text': text
      }],
      responseType: 'json'
    });

    const translatedText = response.data[0].translations[0].text;
    const translation = new Translation({
      text,
      translatedText,
      from,
      to
    });

    await translation.save();
    res.json({ translatedText });
  } catch (error) {
    console.error('Translation API Error:', error.message);
    res.status(500).json({ message: 'Translation failed', error: error.message });
  }
};

module.exports = { translateText };
