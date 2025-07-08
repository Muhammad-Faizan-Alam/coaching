const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit on connection failure
  }
};

// Close MongoDB connection on app errors
const gracefulExit = async (reason, code) => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB connection closed due to ${reason}`);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err.message);
  } finally {
    process.exit(code);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  gracefulExit('unhandled rejection', 1);
});

process.on('SIGINT', () => {
  gracefulExit('app termination (SIGINT)', 0);
});

module.exports = connectDB;