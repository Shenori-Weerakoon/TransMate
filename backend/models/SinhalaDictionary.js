const mongoose = require('mongoose');

const sinhalaDictionarySchema = new mongoose.Schema({
  sinhalaWord: {
    type: String,
    required: true,
    unique: true,
  },
  englishWords: {
    type: [String],
    required: true,
    validate: {
      validator: function (array) {
        return array.length >= 1 && array.length <= 3;
      },
      message: 'You must provide between 1 and 3 English words'
    }
  },
  status: {
    type: [String],
    default: ['pending', 'pending', 'pending']
  }
}, {
  timestamps: true,
});

const SinhalaDictionary = mongoose.model('SinhalaDictionary', sinhalaDictionarySchema);

module.exports = SinhalaDictionary;