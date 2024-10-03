const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const translateRoutes = require('./routes/translateRoutes');
const sinhalaDictionaryRoutes = require('./routes/SinhalaDictionaryRoutes');
const axios = require('axios');
const bodyParser = require('body-parser');
const phrasebookRoutes = require('./routes/phrasebookRoutes.js');
const userRoutes = require ('./routes/userRoutes.js')


const shortFormRouter = require('./routes/shortFormRouter');

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api', translateRoutes);
app.use('/api/sinhala-dictionary', sinhalaDictionaryRoutes);

app.use('/words', shortFormRouter);

app.use('/phrasebook', phrasebookRoutes); 
app.use('/user', userRoutes); 


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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});