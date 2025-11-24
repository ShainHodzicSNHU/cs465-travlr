const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/travlr';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongoose connection error:', err));

// optional: clean shutdown logs
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
