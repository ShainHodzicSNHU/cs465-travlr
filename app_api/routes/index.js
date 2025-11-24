const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Base: /api
router.get('/trips', tripsController.tripsList);

module.exports = router;
