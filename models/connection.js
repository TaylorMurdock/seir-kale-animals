require("dotenv").config(); // Loads environment variables from a .env file

const mongoose = require("mongoose"); // Import the Mongoose library

mongoose.connect(process.env.DATABASE_URL); // Connect to the MongoDB database using the DATABASE_URL from the environment variables

mongoose.connection; // Access the Mongoose connection object

module.exports = mongoose; // Export the mongoose object for use in other files
