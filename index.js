const data = require("./data.json");
const hexColors = require("./hexColors.json");

let clothingColors = [];

for (let i = 0; i < data.length; i++) {
  clothingColors.push(commaSeperatedStringToArray(data[i]["clothing-colors"]));
}

// Merge the cloting colors array.
let mergedClothingColors = [].concat.apply([], clothingColors);

// Retrieve the hex colors.
let clothingHexColors = clothingColors.map(getHexColors);

function commaSeperatedStringToArray(string) {
  // Replace whitespace using Regex.
  string = string.replace(/\s+/g, "");
  return string.split(",");
}

// Retrieves the hex colors.
function getHexColors(colors) {
  return colors.map((color) => hexColors[color]);
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

console.log(distribution(mergedClothingColors));

// Retrieves the distribution of strings and numbers in an array in percentages.
function percentage(object) {
  let totalAnswers = 0;
  // Retrieve the total answers.
  Object.keys(object).forEach((key) => {
    totalAnswers += object[key];
  });
  Object.keys(object).forEach((key) => {
    object[key] = Math.round((object[key] / totalAnswers) * 100);
  });
  return object;
}

console.log(percentage(distribution(mergedClothingColors)));
