const ShortForm = require('../models/shortForm');

// Create a new short form entry
exports.createShortForm = async (req, res) => {
  try {
    const { shortForm, fullForm, status } = req.body;
    const newShortForm = new ShortForm({ shortForm, fullForm, status });
    await newShortForm.save();
    res.status(201).json({ message: 'Short form entry created successfully', data: newShortForm });
  } catch (error) {
    res.status(400).json({ message: 'Error creating short form entry', error });
  }
};

// Get all short form entries
exports.getAllShortForms = async (req, res) => {
  try {
    const shortForms = await ShortForm.find();
    res.status(200).json({ data: shortForms });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching short form entries', error });
  }
};

//Get all accepted words
exports.getAllAcceptedShortForms = async (req, res) => {
  try {
    const shortForms = await ShortForm.find({ status: 'approved' }); // Only fetch accepted short forms
    res.status(200).json({ data: shortForms });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching short form entries', error });
  }
};

// Get a specific short form entry by short form
exports.getShortForm = async (req, res) => {
  try {
    const shortForm = await ShortForm.findOne({ shortForm: req.params.shortForm });
    if (!shortForm) {
      return res.status(404).json({ message: 'Short form not found' });
    }
    res.status(200).json({ data: shortForm });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching short form entry', error });
  }
};

// Update a short form entry
exports.updateShortForm = async (req, res) => {
  try {
    const updatedShortForm = await ShortForm.findOneAndUpdate(
      { shortForm: req.params.shortForm },
      req.body,
      { new: true }
    );
    if (!updatedShortForm) {
      return res.status(404).json({ message: 'Short form not found' });
    }
    res.status(200).json({ message: 'Short form entry updated', data: updatedShortForm });
  } catch (error) {
    res.status(400).json({ message: 'Error updating short form entry', error });
  }
};

// Delete a short form entry
exports.deleteShortForm = async (req, res) => {
  try {
    const deletedShortForm = await ShortForm.findOneAndDelete({ shortForm: req.params.shortForm });
    if (!deletedShortForm) {
      return res.status(404).json({ message: 'Short form not found' });
    }
    res.status(200).json({ message: 'Short form entry deleted', data: deletedShortForm });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting short form entry', error });
  }
};
