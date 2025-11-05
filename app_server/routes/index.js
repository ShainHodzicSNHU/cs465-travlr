const express = require('express');
const router = express.Router();
const travelerCtrl = require('../controllers/traveler');

// Public travel page endpoint
router.get('/travel', travelerCtrl.travelList);

module.exports = router;
