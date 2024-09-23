// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// Grammar check route
/*
app.post('/api/grammarcheck', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for grammar checking.' });
  }

  try {
    // Sending request to LanguageTool API
    const response = await axios.post('https://api.languagetool.org/v2/check', null, {
      params: {
        language: 'en-US', // Adjust language as needed
        text: text
      }
    });

    const grammarErrors = response.data.matches.map(match => ({
      offset: match.offset,
      length: match.length,
      message: match.message
    }));

    res.status(200).json({ grammarErrors });
  } catch (error) {
    console.error('Error while checking grammar:', error);
    res.status(500).json({ error: 'Grammar check failed.' });
  }
});
*/
