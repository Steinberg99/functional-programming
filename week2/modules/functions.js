/* Week 2 */

// Capitilize the first letter of a string.
export function firstLetterToUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Change pokemon types into an array.
export function typesToArray(object) {
  let types = [];
  Object.keys(object).forEach(key => {
    types.push(object[key].type.name);
  });
  return types;
}

// Change pokemon moves into an array.
export function movesToArray(object) {
  let moves = [];
  Object.keys(object).forEach(key => {
    moves.push([
      firstLetterToUpperCase(object[key].move.name),
      object[key].move.url
    ]);
  });
  return moves;
}

export default "";
