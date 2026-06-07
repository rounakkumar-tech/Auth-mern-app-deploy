const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error('Missing MongoDB connection string. Set MONGO_CONN in your .env file.');
  process.exit(1);
}

mongoose.connect(mongo_url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
