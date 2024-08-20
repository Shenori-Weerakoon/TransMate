const mongoose = require('mongoose');

const translationSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  translatedText: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;
