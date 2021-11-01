const express = require("express");
const app = express();
const port = 4200;
const data = require("./data/data.json");
const {
  commaSeperatedStringToArray,
  hexColor,
  hexColorArray,
  distribution,
  percentages,
  sortObject,
  sortedObjectToArray,
  gradient
} = require("./modules/functions.js");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

let colorArrays = [];
let hexColorArrays = [];

let gradients = [];

let colorDistribution;
let colorPercentages;

let sortedColorDistribution;
let sortedColorPercentages;

let sortedColors;
let sortedHexColors;

function main() {
  // Create the color arrays and turn them into hex color arrays.
  for (let i = 0; i < data.length; i++) {
    colorArrays.push(commaSeperatedStringToArray(data[i]["clothing-colors"]));
  }
  hexColorArrays = colorArrays.map(array => hexColorArray(array));

  // Create the CSS gradients based on the hex color arrays.
  for (let i = 0; i < hexColorArrays.length; i++) {
    gradients.push(gradient(hexColorArrays[i]));
  }

  // Create the color distribution and the color percentages based on the color arrays.
  colorDistribution = distribution([].concat.apply([], colorArrays));
  colorPercentages = percentages(colorDistribution);

  // Sort the color distribution and color percentages objects.
  sortedColorDistribution = sortObject(colorDistribution);
  sortedColorPercentages = sortObject(colorPercentages);

  // Turn the sorted color distribution object into an array of hex colors.
  sortedColors = sortedObjectToArray(sortObject(colorDistribution));
  sortedHexColors = sortedColors.map(color => hexColor(color));
}

// Run the main function when the server starts.
main();

// Render the homepage.
app.get("/", (req, res) => {
  res.render("home", {
    gradients: gradients,
    sortedHexColors: sortedHexColors,
    sortedColorPercentages: sortedColorPercentages,
    hexColor: hexColor
  });
});

// Start server on local port.
app.listen(port, () => {
  console.log(`Listening at https://localhost:${port}`);
});
