const mongoose = require('mongoose');


const sinhalaDictionarySchema = new mongoose.Schema({
  sinhalaWord: {
    type: String,
    required: true,
    unique: true,
  },
  englishWords: {
    type: [String], // Array of English words
    required: true,
    validate: {
      validator: function(array) {
        return array.length >= 1 && array.length <= 3;
      },
      message: 'You must provide between 1 and 3 English words'
    }
  }
});

const SinhalaDictionary = mongoose.model('SinhalaDictionary', sinhalaDictionarySchema);

module.exports = SinhalaDictionary;