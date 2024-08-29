const express = require('express');
const { translateText } = require('../controllers/translateController');
const { getTranslations } = require('../controllers/translateController');
const router = express.Router();

router.post('/translate', translateText);
router.get('/translations', getTranslations); // Read

module.exports = router;
