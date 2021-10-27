const express = require('express');
const app = express();
const port = 4200;

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

const data = require('./data.json');
const hexColors = require('./hexColors.json');

let clothingColors = [];
let mergedClothingColors = [];
let clothingHexColors = [];
let colorDistribution;
let colorPercentages;
let colorGradients = [];

// Render the homepage.
app.get('/', (req, res) => {
  res.render('home', {
    colorGradients: colorGradients,
    colorDistribution: colorDistribution,
    getHexColor: getHexColor
  });
});

// Main function.
function main() {
  // Retrieve the clothing colors from the data.json file.
  for (let i = 0; i < data.length; i++) {
    clothingColors.push(
      commaSeperatedStringToArray(data[i]['clothing-colors'])
    );
  }
  // Merge the cloting colors array.
  mergedClothingColors = [].concat.apply([], clothingColors);
  // Retrieve the hex colors codes.
  clothingHexColors = clothingColors.map(getHexColors);
  // Retrieve the distribution of colors.
  colorDistribution = distribution(mergedClothingColors);
  // Retrieve the color percentages based on the distribution of colors.
  colorPercentages = percentage(colorDistribution);
  // Retrieve the css gradient strings.
  for (let i = 0; i < clothingHexColors.length; i++) {
    colorGradients.push(gradient(clothingHexColors[i]));
  }
}

function commaSeperatedStringToArray(string) {
  // Replace whitespace using Regex.
  string = string.replace(/\s+/g, '');
  return string.split(',');
}

// Retrieves the hex colors.
function getHexColors(colors) {
  return colors.map(color => hexColors[color]);
}

function getHexColor(color) {
  return hexColors[color];
}

// Retrieves the distribution of strings and numbers in an array.
function distribution(data) {
  let object = {};
  for (let i = 0; i < data.length; i++) {
    if (!object.hasOwnProperty(data[i])) {
      Object.assign(object, { [data[i]]: 0 });
    }
    object[[data[i]]]++;
  }
  return object;
}

// Retrieves the distribution of strings and numbers in an array in percentages.
function percentage(object) {
  let totalAnswers = 0;
  // Retrieve the total answers.
  Object.keys(object).forEach(key => {
    totalAnswers += object[key];
  });
  Object.keys(object).forEach(key => {
    object[key] = Math.round((object[key] / totalAnswers) * 100);
  });
  return object;
}

// Retrieves the css gradient strings based on the hex color codes.
function gradient(colors) {
  if (colors[1]) {
    let gradient = 'linear-gradient(to right,';
    for (let i = 0; i < colors.length - 1; i++) {
      gradient += ` ${colors[i]} ${(100 / (colors.length - 1)) * i}%,`;
      gradient += ` ${colors[i]} ${(100 / (colors.length - 1)) * (i + 1)}%,`;
    }
    gradient += ` ${colors[colors.length - 1]} ${
      (100 / (colors.length - 1)) * (colors.length - 2)
    }%,`;
    gradient += ` ${colors[colors.length - 1]} ${
      (100 / (colors.length - 1)) * (colors.length - 1)
    }%)`;
    return gradient;
  }
  return colors[0];
}

main();

// Start server on local port.
app.listen(port, () => {
  console.log(`Listening at https://localhost:${port}`);
});
