const data = require("./data.json");

let dairy = [];
let excitement = [];

for (let i = 0; i < data.length; i++) {
  dairy.push(data[i]["favourite-dairy-product"]);
  excitement.push(data[i]["excitement-for-tech-track"]);
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
  Object.keys(object).forEach((key) => {
    totalAnswers += object[key];
  });
  Object.keys(object).forEach((key) => {
    object[key] = Math.round((object[key] / totalAnswers) * 100);
  });
  return object;
}

console.log(distribution(dairy));
console.log(percentage(distribution(dairy)));
