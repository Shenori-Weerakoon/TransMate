const express = require('express');
const router = express.Router();
const shortFormController = require('../controllers/shortFormController');

router.post('/shortforms', shortFormController.createShortForm);
router.get('/shortforms', shortFormController.getAllShortForms);
router.get('/shortforms/:shortForm', shortFormController.getShortForm);
router.put('/shortforms/:shortForm', shortFormController.updateShortForm);
router.delete('/shortforms/:shortForm', shortFormController.deleteShortForm);

module.exports = router;
