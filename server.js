// import dependencies
require("dotenv").config(); // Loads environment variables from a .env file
const express = require("express"); // Import the Express framework
const morgan = require("morgan"); // Middleware for logging HTTP requests
const methodOverride = require("method-override"); // Middleware for handling HTTP method overrides
const Animal = require("./models/animals"); // Import the Animal model

const app = express(); // Create an instance of the Express application

app.use(morgan("dev")); // Use Morgan middleware for logging HTTP requests in the development environment
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies
app.use(methodOverride("_method")); // Middleware for handling HTTP method overrides

app.get("/", (req, res) => {
  // Route handler for the root URL ("/")
  res.send("hello world"); // Send a response of "hello world"
});

app.get("/animals", async (req, res) => {
  // Route handler for "/animals" to fetch and render all animals
  const allAnimals = await Animal.find({}); // Retrieve all animals from the database using the Animal model
  console.log(allAnimals); // Log the fetched animals to the console
  res.render("index.ejs", { animals: allAnimals }); // Render the "index.ejs" view with the fetched animals as data
});

app.get("/animals/new", (req, res) => {
  // Route handler for "/animals/new" to render the form for creating a new animal
  res.render("new.ejs"); // Render the "new.ejs" view
});

app.post("/animals", async (req, res) => {
  // Route handler for creating a new animal
  if (req.body.extinct === "on") {
    req.body.extinct = true; // Convert the "extinct" checkbox value to a boolean if checked
  } else {
    req.body.extinct = false; // Set the "extinct" value to false if not checked
  }
  await Animal.create(req.body); // Create a new animal in the database using the Animal model and the request body
  res.redirect("/animals"); // Redirect to the "/animals" page after the animal is created
});

app.get("/animals/:id", async (req, res) => {
  // Route handler for fetching and rendering a specific animal
  const foundAnimal = await Animal.findById(req.params.id); // Find the animal with the specified ID in the database
  res.render("show.ejs", { animal: foundAnimal }); // Render the "show.ejs" view with the fetched animal as data
});

app.delete("/animals/:id", async (req, res) => {
  // Route handler for deleting an animal
  await Animal.findByIdAndDelete(req.params.id); // Find and delete the animal with the specified ID from the database
  res.redirect("/animals"); // Redirect to the "/animals" page after the animal is deleted
});

app.get("/animals/:id/edit", async (req, res) => {
  // Route handler for rendering the edit form for a specific animal
  const animal = await Animal.findById(req.params.id); // Find the animal with the specified ID in the database
  res.render("edit.ejs", { animal }); // Render the "edit.ejs" view with the fetched animal as data
});

app.put("/animals/:id", async (req, res) => {
  // Route handler for updating an animal
  if (req.body.extinct === "on") {
    req.body.extinct = true; // Convert the "extinct" checkbox value to a boolean if checked
  } else {
    req.body.extinct = false; // Set the "extinct" value to false if not checked
  }

  await Animal.findByIdAndUpdate(req.params.id, req.body); // Find and update the animal with the specified ID in the database using the request body
  res.redirect("/animals"); // Redirect to the "/animals" page after the animal is updated
});

// listener
app.listen(
  process.env.PORT,
  () => console.log(`listening to port ${process.env.PORT}`) // Start the server and listen on the specified port
);
