/* Week 2 */

import fetch from "node-fetch";
import {
  firstLetterToUpperCase,
  movesToArray,
  typesToArray
} from "./modules/functions.js";

const topic = "pokemon";
const url = `https://pokeapi.co/api/v2/${topic}/`;

async function main() {
  const pokemonData = cleanPokemonData(await fetchPokemonData(9)); // Clean the fetched pokemon data.
  console.log(pokemonData); // Log the data to the console.
}

// Recieve the pokemon data based on the provided amount.
async function fetchPokemonData(amount) {
  try {
    let promises = []; // Array to store the promises.
    for (let i = 0; i < amount; i++) {
      promises.push(fetchPokemon(i + 1)); // Push the promises from the fetch pokemon function to the promises array.
    }
    return Promise.all(promises).then(results => results); // Resolve the array of promises and return it.
  } catch (error) {
    console.log(error);
  }
}

async function fetchPokemon(id) {
  try {
    const response = await fetch(url + id); // Fetch the specific pokemon data with the pokemon id.
    const data = await response.json();
    return data; // Return the data.
  } catch (error) {
    console.log(error);
  }
}

// Function to clean the pokemon data.
function cleanPokemonData(data) {
  let cleanedPokemonData = [];
  data.forEach(pokemon => {
    cleanedPokemonData.push({
      name: firstLetterToUpperCase(pokemon.name), // Capitilize the first letter of the pokemon name.
      types: typesToArray(pokemon.types), // Turn the types to an array of types.
      weight: pokemon.weight,
      height: pokemon.height,
      image_url: pokemon.sprites.front_default
      // moves: movesToArray(pokemon.moves)
    });
  });
  return cleanedPokemonData;
}

// Run the main function.
main();
