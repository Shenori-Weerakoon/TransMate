const express = require('express');
const router = express.Router();
const SinhalaDictionary = require('../models/SinhalaDictionary');

// Add a new word
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
    const newWord = new SinhalaDictionary({
      sinhalaWord,
      englishWords: filteredEnglishWords,
      status: filteredEnglishWords.map(() => 'pending')
    });
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

// Accept a specific English word
router.patch('/acceptWord/:id/:index', async (req, res) => {
  const { id, index } = req.params;

  try {
    const word = await SinhalaDictionary.findById(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    word.status[index] = 'accepted';
    await word.save();
    res.status(200).json({ message: 'Word accepted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Reject a specific English word
router.patch('/rejectWord/:id/:index', async (req, res) => {
  const { id, index } = req.params;

  try {
    const word = await SinhalaDictionary.findById(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    word.englishWords.splice(index, 1);
    word.status.splice(index, 1);
    await word.save();
    res.status(200).json({ message: 'Word rejected and removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a word
router.delete('/deleteWord/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const word = await SinhalaDictionary.findByIdAndDelete(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    res.status(200).json({ message: 'Word deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a word
router.put('/updateWord/:id', async (req, res) => {
  const { id } = req.params;
  const { sinhalaWord, englishWords } = req.body;

  const filteredEnglishWords = englishWords.filter(word => word.trim() !== '');

  if (!sinhalaWord || filteredEnglishWords.length === 0) {
    return res.status(400).json({ message: 'Sinhala word and at least one English word are required' });
  }

  try {
    const word = await SinhalaDictionary.findById(id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }

    word.sinhalaWord = sinhalaWord;
    word.englishWords = filteredEnglishWords;
    word.status = filteredEnglishWords.map(() => 'pending'); 

    await word.save();
    res.status(200).json({ message: 'Word updated successfully', word });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;