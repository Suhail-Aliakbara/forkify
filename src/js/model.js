import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
    console.error(`${err} *******`);
  }
};
