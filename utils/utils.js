const _ = require('lodash');

const mergeIngredients = (recipe) => {
  const ingredients = [];
  recipe.ingredients.forEach((ingredient, index) => {
    ingredients.push(ingredient.name);
    if (ingredients.indexOf(ingredient.name) !== index) {
      ingredient.grams +=
        recipe.ingredients[ingredients.indexOf(ingredient.name)].grams;
      recipe.ingredients.splice(ingredients.indexOf(ingredient.name), 1);
    }
  });
  return recipe;
};

const filterRecipes = (excludeArray, recipes) => {
  if (excludeArray?.length) {
    const filteredRecipes = [];
    recipes.forEach((recipe) => {
      if (!_.some(recipe.ingredients, ['name', excludeArray[0]])) {
        filteredRecipes.push(recipe);
      }
    });
    return filterRecipes(excludeArray.slice(1), filteredRecipes);
  } else {
    return recipes;
  }
};

module.exports = { filterRecipes, mergeIngredients };
