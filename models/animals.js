const mongoose = require("./connection"); // Import the Mongoose connection object from the "./connection" file

const animalSchema = new mongoose.Schema({
  species: { type: String, required: true },
  extinct: { type: Boolean },
  location: { type: String },
  lifeExpectancy: { type: Number },
});

const Animal = mongoose.model("Animal", animalSchema); // Create a Mongoose model named "Animal" using the animalSchema

module.exports = Animal; // Export the Animal model for use in other files
