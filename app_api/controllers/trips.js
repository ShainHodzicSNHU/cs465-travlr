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

// POST /api/trips
const tripsCreate = async (req, res) => {
  try {
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json({ message: "Error creating trip", error: err });
  }
};

// PUT /api/trips/:tripId
const tripsUpdateOne = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: "Invalid trip ID" });
  }

  try {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(400).json({ message: "Error updating trip", error: err });
  }
};

// DELETE /api/trips/:tripId
const tripsDeleteOne = async (req, res) => {
  const tripId = req.params.tripId;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: "Invalid trip ID" });
  }

  try {
    const result = await Trip.findByIdAndDelete(tripId).exec();

    if (!result) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // 204 No Content is standard for a successful delete
    return res.status(204).json(null);
  } catch (err) {
    return res.status(500).json({ message: "Error deleting trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindById,
  tripsCreate,
  tripsUpdateOne,
  tripsDeleteOne
};
