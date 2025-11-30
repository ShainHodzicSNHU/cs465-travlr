const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err });
  }
};

// GET /api/trips/:tripId
const tripsFindById = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: "Invalid trip ID" });
  }

  try {
    const trip = await Trip.findById(tripId).exec();

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: "Database error", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindById
};
