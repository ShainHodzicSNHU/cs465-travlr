const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

// GET all trips
router.get('/trips', ctrlTrips.tripsList);

// GET single trip by ID
router.get('/trips/:tripId', ctrlTrips.tripsFindById);

module.exports = router;
