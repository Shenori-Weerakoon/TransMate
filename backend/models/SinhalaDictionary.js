const mongoose = require('mongoose');

const sinhalaDictionarySchema = new mongoose.Schema({
  englishWord: {
    type: String,
    required: true,
    unique: true,
  },
  sinhalaMeanings: {
    type: [String], // Array of strings to hold multiple meanings
    required: true,
    validate: {
      validator: function(array) {
        return array.length >= 1 && array.length <= 3;
      },
      message: 'You must provide between 1 and 3 Sinhala meanings'
    }
  },
});

const SinhalaDictionary = mongoose.model('SinhalaDictionary', sinhalaDictionarySchema);

module.exports = SinhalaDictionary;