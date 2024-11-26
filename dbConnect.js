const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Ensure password is URL-encoded if it contains special characters
const dbUsername = process.env.DB_USERNAME;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); // Encoding the password
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME; // Use the value from .env for the database name

// MongoDB connection string using environment variables
const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connection Successful!');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connected to', dbName);
});
