import { apiGet } from './api';
import Shop from './shop';
import ShoppingListItem from './shoppingListItem';
import { ShoppingArticle } from './shoppingArticles';

const removeDiacritics = require('diacritics').remove;

export const shoppingListData = {
  categories: [],
  currentShop: null,
  shoppingArticlesList: [],
  shoppingList: [],
  shops: [],
  shopsIcons: [],
};

const loadArticles = function (articles) {
  articles.forEach(article => {
    shoppingListData.shoppingArticlesList.push(
      new ShoppingArticle(article.name, article.category)
    );
  });
};

const loadShoppingList = function (shoppingListItems) {
  shoppingListItems.forEach(item => {
    const article = shoppingListData.shoppingArticlesList.find(
      shoppingArticle => shoppingArticle.name === item.article_name
    );
    shoppingListData.shoppingList.push(
      new ShoppingListItem(article, item.amount, item.checked)
    );
  });
};

const loadShops = function (shops) {
  shops.forEach(shop =>
    shoppingListData.shops.push(
      new Shop(shop.name, shop.logo, shop.category_list)
    )
  );
};

export const loadDataFromJSON = function (jsonData) {
  shoppingListData.categories = jsonData.categories;
  loadArticles(jsonData.shopping_articles_list);
  loadShoppingList(jsonData.shopping_list);
  loadShops(jsonData.shops);
  shoppingListData.currentShop = shoppingListData.shops.find(
    shop => shop.name === jsonData.current_shop
  );
  shoppingListData.shopsIcons = jsonData.shops_icons;
};

export const loadData = async function () {
  const { shopping_list } = await apiGet();
  loadDataFromJSON(shopping_list);
};

export const generateShoppingListItemId = function (article_name) {
  let newId = removeDiacritics(article_name).replaceAll(' ', '_');
  const countOfItems = shoppingListData.shoppingList.filter(
    x => removeDiacritics(x.article.name).replaceAll(' ', '_') === newId
  ).length;
  if (countOfItems > 0) {
    newId = `${newId}_${countOfItems}`;
  }
  return newId;
};

export const generateArticleId = function (article_name) {
  let newId = removeDiacritics(article_name).replaceAll(' ', '_');
  const countOfItems = shoppingListData.shoppingArticlesList.filter(
    x => removeDiacritics(x.name).replaceAll(' ', '_') === newId
  ).length;
  if (countOfItems > 0) {
    newId = `${newId}_${countOfItems}`;
  }
  return newId;
};

export const toggleChecked = function (item_id) {
  const item = shoppingListData.shoppingList.find(el => el.id === item_id);
  item.checked = !item.checked;
};
