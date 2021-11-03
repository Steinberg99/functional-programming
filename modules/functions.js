/* Week one. */

const hexColorData = require("../data/hexColorData.json");

// Seperates a comma separated string into an array of strings.
function commaSeperatedStringToArray(string) {
  // Replace whitespace using Regex.
  string = string.replace(/\s+/g, "");
  return string.split(",");
}

// Turns a string into a hex color.
function hexColor(string) {
  return hexColorData[string];
}

// Turns an array of strings into hex colors.
function hexColorArray(array) {
  return array.map(string => hexColorData[string]);
}

// Retrieves the distribution of values in an array.
function distribution(array) {
  let object = {};
  for (let i = 0; i < array.length; i++) {
    if (object.hasOwnProperty(array[i])) {
      object[[array[i]]]++;
    } else {
      Object.assign(object, { [array[i]]: 1 });
    }
  }
  return object;
}

// Retrieves the distribution of values in an array in percentages.
function percentages(object) {
  let totalAnswers = 0;
  // Retrieve the total answers.
  Object.keys(object).forEach(key => {
    totalAnswers += object[key];
  });
  // Calculate the percentage for each key.
  Object.keys(object).forEach(key => {
    object[key] = Math.round((object[key] / totalAnswers) * 100);
  });
  return object;
}

// Sort the keys of an object based on their numeric values.
function sortObject(object) {
  var array = [];
  for (let key in object) {
    array.push([key, object[key]]);
  }
  array.sort(function (a, b) {
    // Sort the key and value arrays based on the value.
    return b[1] - a[1]; // Sort b over a so the arrays will be sorted into a descending order.
  });
  let sortedObject = {};
  array.forEach(item => {
    sortedObject[item[0]] = item[1]; // Recreate the object based on the values in descending order.
  });
  return sortedObject;
}

// Turns a sorted object into an array.
function sortedObjectToArray(object) {
  let array = [];
  Object.keys(object).forEach(key => {
    for (let i = 0; i < object[key]; i++) {
      array.push(key); // Push the key into the array x amount of times based on the corresponding value.
    }
  });
  return array;
}

// Creates a CSS gradient based on an array of hex colors.
function gradient(colorArray) {
  let interval = 100 / (colorArray.length - 1);
  let string = "linear-gradient(to right,";
  // If the array contains more then one color, create the gradient.
  if (colorArray[1]) {
    for (let i = 0; i < colorArray.length; i++) {
      // To create the desired effect the hex color has to be repeated.
      string += ` ${colorArray[i]} ${interval * i}%,`;
      string += ` ${colorArray[i]} ${interval * (i + 1)}%,`;
    }
    string = string.slice(0, -1) + ")";
    return string;
  }
  // If the array of colors only contains one color return this color.
  return colorArray[0];
}

// Export the functions.
module.exports = {
  commaSeperatedStringToArray: commaSeperatedStringToArray,
  hexColor: hexColor,
  hexColorArray: hexColorArray,
  distribution: distribution,
  percentages: percentages,
  sortObject: sortObject,
  sortedObjectToArray: sortedObjectToArray,
  gradient: gradient
};
