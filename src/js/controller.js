import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

if (module.hot) {
  module.hot.accept();
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    let id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1. loading the recipe
    await model.loadRecipe(id);

    //2. Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render new search results for the target page
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render updated pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  //Update the Recipe Servings
  model.updateServings(newServings);

  //update the Recipe View
  recipeView.render(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
