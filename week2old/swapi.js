import fetch from "node-fetch";

// Fetch the Star Wars character data.
function fetchCharacterData(id) {
  const url = `https://swapi.dev/api/people/${id}`; // Create the url.
  return fetch(url)
    .then(response => response.json())
    .then(data => characterData(data)) // Create an object with the character data.
    .then(characterData => fetchHomeworldData(characterData)) // Fetch the data of the homeworld of the character.
    .then(completeData => completeData) // Combine the character and homeworld data into one object.
    .catch(error => console.log(error));
}

// Create an object with the character data.
function characterData(data) {
  return {
    name: data.name,
    gender: data.gender,
    height: data.height,
    mass: data.mass,
    homeworld: data.homeworld
  };
}

// Fetch the data of the homeworld of the character.
function fetchHomeworldData(characterData) {
  return fetch(characterData.homeworld)
    .then(response => response.json())
    .then(data => completeData(data, characterData))
    .then(data => data);
}

// Combine the character and homeworld data into one object.
function completeData(homeworldData, characterData) {
  characterData.homeworld = {
    name: homeworldData.name,
    climate: homeworldData.climate,
    terrain: homeworldData.terrain
  };
  return characterData;
}

async function getCharacters() {
  let promises = [];
  let characters = [];

  // Push the promises into one array.
  for (let i = 1; i < 11; i++) {
    promises.push(fetchCharacterData(i));
  }

  // Resolve the array of promises at once resulting in an array of character objects.
  await Promise.all(promises).then(results => {
    characters = results;
  });

  console.log(characters);
}

getCharacters();
