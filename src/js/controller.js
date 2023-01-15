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
import { filterArticles, getArticleByName } from './data/shoppingArticles.js';
import {
  addArticleToShoppingList,
  deleteAllItems,
  getShoppingListItemByName,
  sortByShop,
} from './data/shoppingListItem.js';
import menuView from './views/menuView.js';
import categoriesView from './views/categoriesView.js';

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

const controlAddShoppingListItem = function (itemName) {
  console.log(itemName);
  const article = getArticleByName(itemName);
  if (!article) return;
  if (getShoppingListItemByName(itemName)) return;
  addArticleToShoppingList(article);
  console.log(shoppingListData.shoppingList);
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
};

const controlDeleteAll = function () {
  deleteAllItems();
  shoppingListView.render(shoppingListData.shoppingList);
};

const controlOpenCategoryView = function (id) {
  categoriesView.render(shoppingListData.categories);
  categoriesView.showWindow(id);
};

const controlSelectCategory = function (id, categoryName) {
  const shoppingListItem = getShoppingListItemById(id);
  shoppingListItem.article.category = categoryName;
  shoppingListView.render(shoppingListData.shoppingList);
  categoriesView.hideWindow();
};

const init = async function () {
  await loadData();
  console.log(shoppingListData);

  menuView.displayCurrentShop(shoppingListData.currentShop.name);

  shoppingListView.setCategoryHandler(controlOpenCategoryView);
  shoppingListView.render(shoppingListData.shoppingList);

  shoppingListView.addHandlerClickItem(controlClickItem);
  shoppingListView.addHandlerSetQuantity(controlQuantityChange);

  searchView.render(shoppingListData.shoppingArticlesList);

  searchView.addHandlerFocusIn(controlSearchFieldFocusIn);
  searchView.addHandlerKeyPress(controlSearchFieldKeyPress);
  searchView.addHandlerButtonPress(controlAddShoppingListItem);
  menuView.addHandlerDeleteAll(controlDeleteAll);

  categoriesView.addHandlerSelectItem(controlSelectCategory);
};
init();
