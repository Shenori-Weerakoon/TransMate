const express = require('express');
const router = express.Router();
const SinhalaDictionary = require('../models/SinhalaDictionary');


// Add a new word with multiple English meanings
router.post('/addWord', async (req, res) => {
  const { sinhalaWord, englishWords } = req.body;

  if (!sinhalaWord) {
    return res.status(400).json({ message: 'Sinhala word is required' });
  }

  const filteredEnglishWords = englishWords.filter(word => word.trim() !== '');

  if (filteredEnglishWords.length === 0) {
    return res.status(400).json({ message: 'At least one English word is required' });
  }

  try {
    const newWord = new SinhalaDictionary({ sinhalaWord, englishWords: filteredEnglishWords });
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