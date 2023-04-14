/*
TODO
dodac amount na liscie
dorobic reakcje na klikanie
  dodac atrybut 'id' do shopping list item (i do article tez) unikalny i dodac go do html
  po kliknieciu ustawic checked na true na odpowiednim shopping list itemie
  wyrenderowac liste od nowa (na razie)
*/

import {
  checkIfUpdateNeeded,
  getShoppingListItemById,
  loadData,
  saveData,
  shoppingListData,
  toggleChecked,
  updateDataOnServer,
} from './data/shoppingListData.js';
import shoppingListView from './views/shoppingListView.js';
import searchView from './views/searchView.js';
import {
  filterArticles,
  getArticleByName,
  removeArticle,
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
import { changeTracker } from './data/changeTracker.js';
import synchronizationView from './views/synchronizationView.js';
import articlesView from './views/articlesView.js';

const updateCheckInterval = 10000;
const pauseUpdateCheck = true;

console.log('sandbox');

const controlSaveData = async function () {
  synchronizationView.setSavingStatus();
  const result = await saveData();
  if (result) {
    synchronizationView.setSynchedStatus();
  } else {
    synchronizationView.setSynchErrorStatus();
  }
};

const controlUpdateData = async function () {
  synchronizationView.setSavingStatus();
  const result = await updateDataOnServer();
  if (result) {
    synchronizationView.setSynchedStatus();
  } else {
    synchronizationView.setSynchErrorStatus();
  }
};

const controlClickItem = function (id) {
  toggleChecked(id);
  shoppingListView.render(shoppingListData.shoppingList);
  controlUpdateData(); // update
};

const controlQuantityChange = function (id, newQuantity) {
  const item = getShoppingListItemById(id);
  item.amount = Number(newQuantity);
  changeTracker.changeShoppingListItemAmount(item);
  controlUpdateData(); // update
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
  controlUpdateData(); // update
};

const controlCreateNewItem = function (itemName, category) {
  if (getShoppingListItemByName(itemName)) return 1;
  if (getArticleByName(itemName)) return 2;
  const shoppingArticle = new ShoppingArticle(itemName, category);
  shoppingListData.shoppingArticlesList.push(shoppingArticle);
  const shoppingListItem = new ShoppingListItem(shoppingArticle);
  shoppingListData.shoppingList.push(shoppingListItem);
  changeTracker.addArticle(shoppingArticle);
  changeTracker.addShoppingListItem(shoppingListItem);
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  controlUpdateData(); // update
  return 0;
};

const controlCreateNewArticle = function (articleName, category) {
  if (getArticleByName(itemName)) return 1;
  const shoppingArticle = new ShoppingArticle(itemName, category);
  shoppingListData.shoppingArticlesList.push(shoppingArticle);
  changeTracker.addArticle(shoppingArticle);
  articlesView.render(shoppingListData.shoppingArticlesList);
  controlUpdateData(); // update
  return 0;
};

const controlRemoveShoppingListItem = function (id) {
  deleteItem(id);
  shoppingListView.render(shoppingListData.shoppingList);
  controlUpdateData(); // update
};

const controlUpdateCheck = async function () {
  if (pauseUpdateCheck) return;
  const isNeeded = await checkIfUpdateNeeded();
  if (!isNeeded) return;
  synchronizationView.setSynchNeededStatus();
  updateData();
};

const controlDeleteAll = function () {
  deleteAllItems();
  shoppingListView.render(shoppingListData.shoppingList);
  controlSaveData();
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
  changeTracker.updateArticleCategory(shoppingListItem.article);
  removeUnusedCategories();
  sortByShop();
  shoppingListView.render(shoppingListData.shoppingList);
  categoriesView.hideWindow();
  controlUpdateData(); // update
};

const controlAddCategory = function (newCategory) {
  if (shoppingListData.categories.includes(newCategory)) return false;
  shoppingListData.categories.push(newCategory);
  shoppingListData.categories.sort();
  changeTracker.addCategory(newCategory); // it will be saved even if category not used
  categoriesView.render(shoppingListData.categories);
  return true;
};

const controlEditCategoryName = function (oldName, newName) {
  if (shoppingListData.categories.includes(newName)) return false;
  editCategoryName(oldName, newName);
  shoppingListView.render(shoppingListData.shoppingList);
  categoriesView.render(shoppingListData.categories);
  controlUpdateData(); // update
  return true;
};

const updateData = async function () {
  const loadResult = await loadData();
  if (loadResult) {
    synchronizationView.setSynchedStatus();
  } else {
    synchronizationView.setSynchErrorStatus();
  }
  menuView.displayCurrentShop(shoppingListData.currentShop.name);
  shoppingListView.render(shoppingListData.shoppingList);
  searchView.render(shoppingListData.shoppingArticlesList);
};

const controlOpenArticlesWindow = function () {
  articlesView.showWindow();
  articlesView.render(shoppingListData.shoppingArticlesList);
};

const controlRemoveArticle = function (articleId) {
  removeArticle(articleId);
  removeUnusedCategories();
  articlesView.render(shoppingListData.shoppingArticlesList);
  controlUpdateData();
};

const init = async function () {
  const loadResult = await loadData();
  if (loadResult) {
    synchronizationView.setSynchedStatus();
  } else {
    synchronizationView.setSynchErrorStatus();
  }
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
  menuView.addHandlerDisplayArticlesWindow(controlOpenArticlesWindow);

  categoriesView.addHandlerSelectItem(controlSelectCategory);
  categoriesView.registerAddCategoryHandler(controlAddCategory);
  categoriesView.registerEditCategoryHandler(controlEditCategoryName);

  articlesView.registerHandlerRemoveArticle(controlRemoveArticle);
  articlesView.registerHandlerAddArticles(controlCreateNewArticle);

  setInterval(controlUpdateCheck, updateCheckInterval);
};
init();
