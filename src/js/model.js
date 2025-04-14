import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // console.log(res, data);

    const { recipe } = data.data; //data.data.recipe can be destruct
    state.recipe = {
      title: recipe.title,
      id: recipe.id,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
    };
    // console.log(recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        title: rec.title,
        id: rec.id,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`${err} *****`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
