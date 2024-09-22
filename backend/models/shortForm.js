const mongoose = require('mongoose');

const shortFormSchema = new mongoose.Schema({
  shortForm: {
    type: String,
    required: true,
    unique: true
  },
  fullForm: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected']
  }
}, { timestamps: true });

const ShortForm = mongoose.model('ShortForm', shortFormSchema);

module.exports = ShortForm;
