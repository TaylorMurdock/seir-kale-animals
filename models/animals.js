const mongoose = require("./connection");

const animalSchema = new mongoose.SchemaType({
  species: { type: String, required: true },
  extinct: { type: Boolean, required: true },
  location: { type: String, required: false },
  lifeExpectancy: { type: Number, required: false },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animals;
