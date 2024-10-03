// controllers/phrasebookController.js

const mongoose = require("mongoose"); // Import mongoose at the top
const Phrasebook = require("../models/phrasebookModel.js");
const expressAsyncHandler = require("express-async-handler");
const validator = require("validator");
require("dotenv").config();

// Add a new phrase
const addPhrase = expressAsyncHandler(async (req, res) => {
  const { phrase, translation, language, user } = req.body; // Get user ID from the request body

  if (!phrase || !translation || !language || !user) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const isValidLanguage = (lang) => /^[a-zA-Z\s]{2,}$/.test(lang);

  if (!isValidLanguage(language)) {
    res.status(400);
    throw new Error("Invalid language name or code");
  }

  try {
    const newPhrase = new Phrasebook({
      phrase,
      translation,
      language,
      user, // Directly use the user ID from the request body
    });

    await newPhrase.save();

    res.status(201).json({
      _id: newPhrase._id, // Use _id
      phrase: newPhrase.phrase,
      translation: newPhrase.translation,
      language: newPhrase.language,
      message: "New phrase added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add new phrase" });
  }
});

// Get all phrases for a user
const getAllPhrases = async (req, res) => {
  const { user } = req.query; // Get user ID from query parameters

  try {
    const phrases = await Phrasebook.find({ user }); // Fetch phrases for the specific user
    res.json(phrases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch phrases" });
  }
};

// Update a phrase
const updatePhrase = async (req, res) => {
  const phraseId = req.params.id; // Extract phrase ID from request parameters
  const { phrase, translation, language, user } = req.body; // Get user ID from request body

  try {
    // Check if all required fields are provided
    if (!phrase || !translation || !language || !user) {
      return res.status(400).json({ error: "Please include all fields" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(phraseId)) {
      return res.status(400).json({ error: "Invalid phrase ID format" });
    }

    // Find the phrase by ID and ensure it belongs to the user
    const existingPhrase = await Phrasebook.findOne({ _id: phraseId, user });

    if (!existingPhrase) {
      return res.status(404).json({ error: "Phrase not found or does not belong to user" });
    }

    // Update fields
    existingPhrase.phrase = phrase;
    existingPhrase.translation = translation;
    existingPhrase.language = language;

    // Save the updated phrase
    await existingPhrase.save();

    res.status(200).json({
      _id: existingPhrase._id, // Use _id
      phrase: existingPhrase.phrase,
      translation: existingPhrase.translation,
      language: existingPhrase.language,
      user: existingPhrase.user,
      message: "Phrase details updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error); // Log the error details
    res.status(500).json({ error: "Failed to update phrase details", details: error.message });
  }
};

// Delete a phrase
const deletePhrase = async (req, res) => {
  const phraseId = req.params.id; // Extract phrase ID from request parameters
  const user = req.body.user; // Ensure user ID is passed in the body

  try {
    const deletedPhrase = await Phrasebook.findOneAndDelete({ _id: phraseId, user }); // Use _id

    if (!deletedPhrase) {
      return res.status(404).json({ error: "Phrase not found or does not belong to user" });
    }

    res.status(200).json({ message: "Phrase deleted successfully" });
  } catch (error) {
    console.error("Error deleting phrase:", error);
    res.status(500).json({ error: "Failed to delete phrase" });
  }
};

// Get a phrase by ID
const getPhraseById = async (req, res) => {
  const phraseId = req.params.id; // Extract phrase ID from request parameters
  const user = req.query.user; // Get user ID from query parameters

  try {
    const phrase = await Phrasebook.findOne({ _id: phraseId, user }); // Use _id

    if (!phrase) {
      return res.status(404).json({ error: "Phrase not found or does not belong to user" });
    }

    res.status(200).json(phrase);
  } catch (error) {
    console.error("Error fetching phrase:", error);
    res.status(500).json({ error: "Failed to fetch phrase details" });
  }
};

module.exports = {
  addPhrase,
  getAllPhrases,
  updatePhrase,
  deletePhrase,
  getPhraseById,
};
