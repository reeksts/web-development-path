import * as model from './model.js';
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import {loadSearchResults} from "./model.js";

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    // Read the current hash:
    const id = window.location.hash.slice(1);

    // Guard clause in case the url is without a hash
    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading the recipe
    await model.loadRecipe(id);

    // 2. Render recipe
    recipeView.render(model.state.recipe)

  } catch(err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.state.search.results);
  } catch(err) {
    console.log(err)
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();