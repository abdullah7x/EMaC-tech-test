const fs = require('fs/promises');
const { mergeIngredients, filterRecipes } = require('../utils/utils');
const db = './data/data.json';

const fetchRecipes = async (exclude_ingredients) => {
  const results = await fs.readFile(db, 'utf8');
  const recipes = JSON.parse(results).map((recipes) => {
    return mergeIngredients(recipes);
  });
  const excludeArray = exclude_ingredients?.split(',');

  return filterRecipes(excludeArray, recipes);
};

const fetchRecipe = async (id) => {
  const recipes = await fetchRecipes();
  return recipes.filter((recipe) => recipe.id === id)[0];
};

module.exports = { fetchRecipes, fetchRecipe };
