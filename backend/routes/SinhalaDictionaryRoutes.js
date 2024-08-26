const express = require('express');
const router = express.Router();
const SinhalaDictionary = require('../models/SinhalaDictionary');

// Add a new word with Sinhala meanings
router.post('/addWord', async (req, res) => {
  const { englishWord, sinhalaMeanings } = req.body;

  if (!englishWord) {
    return res.status(400).json({ message: 'English word is required' });
  }

  const filteredMeanings = sinhalaMeanings.filter(meaning => meaning.trim() !== '');

  if (filteredMeanings.length === 0) {
    return res.status(400).json({ message: 'At least one Sinhala meaning is required' });
  }

  try {
    const newWord = new SinhalaDictionary({ englishWord, sinhalaMeanings: filteredMeanings });
    await newWord.save();
    res.status(201).json({ message: 'Word added successfully', word: newWord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all words
router.get('/getWords', async (req, res) => {
  try {
    const words = await SinhalaDictionary.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;