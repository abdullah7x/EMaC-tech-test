const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
  const { body } = await request.get('/api').expect(200);
  expect(body.message).toBe('ok');
});

describe('GET /api/recipes', () => {
  test('200: returns an array with correctly formatted objects', async () => {
    const { body } = await request.get('/api/recipes').expect(200);
    expect(Array.isArray(body.recipes)).toBe(true);
    body.recipes.forEach((index) => {
      expect(index).toMatchObject({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Array),
      });
    });
  });
  test('200: returns an array without certain ingredients when given query', async () => {
    const { body } = await request
      .get('/api/recipes?exclude_ingredients=milk,apricots')
      .expect(200);
    expect(Array.isArray(body.recipes)).toBe(true);
    body.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        expect(ingredient.name).not.toBe('milk');
        expect(ingredient.name).not.toBe('apricots');
      });
    });
  });
});

describe('GET /api/recipes:id', () => {
  test('200: returns single recipe of given id', async () => {
    const { body } = await request.get('/api/recipes/recipe-74').expect(200);
    expect(typeof body.recipe).toBe('object');
    expect(body.recipe).toMatchObject({
      id: 'recipe-74',
      imageUrl: 'http://www.images.com/2',
      instructions:
        'crush ingredients with mortar and pestle, mix with whole milk, serve in bowl',
      ingredients: [
        { name: 'coffee', grams: 25 },
        { name: 'lime', grams: 140 },
        { name: 'strawberries', grams: 3 },
        { name: 'apricots', grams: 24 },
        { name: 'kale', grams: 50 },
      ],
    });
  });
});

describe('Default error handling', () => {
  test('404: not found upon unknown endpoint', async () => {
    const { body } = await request.get('/hello').expect(404);
    expect(body.message).toBe('End point not found');
    const res = await request.get('/bye').expect(404);
    expect(res.body.message).toBe('End point not found');
  });
});
