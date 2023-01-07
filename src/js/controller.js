/*
TODO
dodac amount na liscie
dorobic reakcje na klikanie
  dodac atrybut 'id' do shopping list item (i do article tez) unikalny i dodac go do html
  po kliknieciu ustawic checked na true na odpowiednim shopping list itemie
  wyrenderowac liste od nowa (na razie)
*/

import {
  getShoppingListItemById,
  loadData,
  saveData,
  shoppingListData,
  toggleChecked,
} from './data/shoppingListData.js';
import shoppingListView from './views/shoppingListView.js';
import searchView from './views/searchView.js';
import { filterArticles } from './data/shoppingArticles.js';

console.log('sandbox');

const controlClickItem = function (id) {
  toggleChecked(id);
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
};

const controlQuantityChange = function (id, newQuantity) {
  const item = getShoppingListItemById(id);
  item.amount = Number(newQuantity);
  saveData();
};

const controlSearchFieldFocusIn = function (filterText) {
  console.log(filterText);
  const articles = filterText
    ? filterArticles(filterText)
    : shoppingListData.shoppingArticlesList;
  searchView.render(articles);
  searchView.displayDropdown();
};

const controlSearchFieldKeyPress = function (filterText) {
  console.log(filterText);
  const articles = filterText
    ? filterArticles(filterText)
    : shoppingListData.shoppingArticlesList;
  searchView.render(articles);
};

const init = async function () {
  await loadData();
  console.log(shoppingListData);

  shoppingListView.render(shoppingListData.shoppingList);

  shoppingListView.addHandlerClickItem(controlClickItem);
  shoppingListView.addHandlerSetQuantity(controlQuantityChange);

  searchView.render(shoppingListData.shoppingArticlesList);

  searchView.addHandlerFocusIn(controlSearchFieldFocusIn);
  searchView.addHandlerKeyPress(controlSearchFieldKeyPress);
};
init();
