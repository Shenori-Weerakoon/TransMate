const express = require('express');
const { translateText, getTranslations, updateTranslation, deleteTranslation } = require('../controllers/translateController');
const router = express.Router();

router.post('/translate', translateText);
router.get('/translations', getTranslations); // Read
router.put('/translations/:id', updateTranslation); // Update
router.delete('/translations/:id', deleteTranslation); // Delete

module.exports = router;
