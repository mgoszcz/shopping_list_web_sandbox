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
import {
  filterArticles,
  getArticleByName,
  ShoppingArticle,
} from './data/shoppingArticles.js';
import ShoppingListItem, {
  addArticleToShoppingList,
  deleteAllItems,
  deleteItem,
  getShoppingListItemByName,
  sortByShop,
} from './data/shoppingListItem.js';
import menuView from './views/menuView.js';
import categoriesView from './views/categoriesView.js';
import {
  editCategoryName,
  removeUnusedCategories,
} from './data/categoriesList.js';

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
  if (!article) {
    shoppingListView.renderNewItem(itemName);
    return;
  }
  if (getShoppingListItemByName(itemName)) return;
  addArticleToShoppingList(article);
  console.log(shoppingListData.shoppingList);
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
};

const controlCreateNewItem = function (itemName, category) {
  if (getShoppingListItemByName(itemName)) return 1;
  if (getArticleByName(itemName)) return 2;
  const shoppingArticle = new ShoppingArticle(itemName, category);
  shoppingListData.shoppingArticlesList.push(shoppingArticle);
  const shoppingListItem = new ShoppingListItem(shoppingArticle);
  shoppingListData.shoppingList.push(shoppingListItem);
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
  return 0;
};

const controlRemoveShoppingListItem = function (id) {
  deleteItem(id);
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
};

const controlDeleteAll = function () {
  deleteAllItems();
  shoppingListView.render(shoppingListData.shoppingList);
  saveData();
};

const controlOpenCategoryView = function (id) {
  console.log(id);
  const shoppingListItem =
    id !== 'NewShoppingListItem' ? getShoppingListItemById(id) : id;
  console.log(shoppingListItem);
  categoriesView.showWindow(shoppingListItem);
  categoriesView.render(shoppingListData.categories);
};

const controlSelectCategory = function (id, categoryName) {
  if (id === 'NewShoppingListItem') {
    shoppingListView.setNewItemCategory(categoryName);
    categoriesView.hideWindow();
    return;
  }
  const shoppingListItem = getShoppingListItemById(id);
  shoppingListItem.article.category = categoryName;
  removeUnusedCategories();
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  categoriesView.hideWindow();
  saveData();
};

const controlAddCategory = function (newCategory) {
  if (shoppingListData.categories.includes(newCategory)) return false;
  shoppingListData.categories.push(newCategory);
  shoppingListData.categories.sort();
  categoriesView.render(shoppingListData.categories);
  return true;
};

const controlEditCategoryName = function (oldName, newName) {
  if (shoppingListData.categories.includes(newName)) return false;
  editCategoryName(oldName, newName);
  shoppingListView.render(shoppingListData.shoppingList);
  categoriesView.render(shoppingListData.categories);
  saveData();
  return true;
};

const init = async function () {
  await loadData();
  console.log(shoppingListData);

  menuView.displayCurrentShop(shoppingListData.currentShop.name);

  shoppingListView.setCategoryHandler(controlOpenCategoryView);
  shoppingListView.render(shoppingListData.shoppingList);

  shoppingListView.addHandlerClickItem(controlClickItem);
  shoppingListView.addHandlerSetQuantity(controlQuantityChange);
  shoppingListView.registerRemoveItemHandler(controlRemoveShoppingListItem);
  shoppingListView.registerSubmitItemHandler(controlCreateNewItem);

  searchView.render(shoppingListData.shoppingArticlesList);

  searchView.addHandlerFocusIn(controlSearchFieldFocusIn);
  searchView.addHandlerKeyPress(controlSearchFieldKeyPress);
  searchView.addHandlerButtonPress(controlAddShoppingListItem);
  menuView.addHandlerDeleteAll(controlDeleteAll);

  categoriesView.addHandlerSelectItem(controlSelectCategory);
  categoriesView.registerAddCategoryHandler(controlAddCategory);
  categoriesView.registerEditCategoryHandler(controlEditCategoryName);
};
init();
