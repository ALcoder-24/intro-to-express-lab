const express = require("express");
const app = express();
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.
// Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.
// Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”

app.get("/greetings/:username-parameter", (req, res) => {
  const { username } = req.params;
  const message = `Glad you are here ${username}!`;
  res.send(message);
});


// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
// Examples: Matches routes like /roll/6 or /roll/20.
// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

app.get("/roll/:number", (req, res) => {
  const { number } = req.params;

  if (isNaN(number) || parseInt(number) < 1) {
    return res.send("You must specify a number.");
  }

  const maxNumber = parseInt(number);

  const rolledNumber = Math.floor(Math.random() * (maxNumber + 1));

  res.send(`You rolled a ${rolledNumber}.`);
});


// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
// Examples: Matches routes like /roll/6 or /roll/20.
// Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.
// Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const { index } = req.params;
  const itemIndex = parseInt(index);

  if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }
  const item = collectibles[itemIndex];
  res.send(
    `So, you want the ${item.name}? For $${item.price}, it can be yours!`
  );
});


// Task: Create a route /shoes that filters the list of shoes based on query parameters.
// Query Parameters:
// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  let filteredShoes = [...shoes];

  const minPrice = parseFloat(req.query["min-price"]);
  const maxPrice = parseFloat(req.query["max-price"]);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }
  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    );
  }
  res.json(filteredShoes);
});

app.listen(3000, () => {
  console.log("Express app is running on port 3000...");
});
