const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const { auth } = require('../config/jwt');
const ctrlAuth = require('../controllers/authentication');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(auth, ctrlTrips.tripsCreate);

router
  .route('/trips/:tripId')
  .get(ctrlTrips.tripsFindById)
  .put(auth, ctrlTrips.tripsUpdateOne)
  .delete(auth, ctrlTrips.tripsDeleteOne);


module.exports = router;
