const { fetchRecipes, fetchRecipe } = require('../models/recipes.models');

exports.getRecipes = async (req, res, next) => {
  try {
    const { exclude_ingredients } = req.query;
    const recipes = await fetchRecipes(exclude_ingredients);
    res.send({ recipes });
  } catch (err) {
    next(err);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await fetchRecipe(id);
    res.send({ recipe });
  } catch (err) {
    next(err);
  }
};
