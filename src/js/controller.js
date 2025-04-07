import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  const renderSpinner = function (parentEl) {};
  try {
    let id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    renderSpinner(recipeContainer);

    //1. loading the recipe
    await model.loadRecipe(id);

    //2. Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
['hashchange', 'load'].map(ev => window.addEventListener(ev, controlRecipes));
