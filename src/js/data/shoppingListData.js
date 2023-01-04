import { apiGet, apiPost } from './api';
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

export const saveDataToJSON = function () {
  jsonData = {
    categories: shoppingListData.categories,
    shopping_articles_list: shoppingListData.shoppingArticlesList.map(
      article => {
        return {
          name: article.name,
          category: article.category,
          selection: 1,
          amount: 1,
        };
      }
    ),
    shopping_list: shoppingListData.shoppingList.map(list_item => {
      return {
        article_name: list_item.article.name,
        amount: list_item.amount,
        checked: list_item.checked,
      };
    }),
    shops: shoppingListData.shops.map(shop => {
      return {
        name: shop.name,
        logo: shop.logo,
        category_list: shop.categoryList,
      };
    }),
    current_shop: shoppingListData.currentShop.name,
    shops_icons: shoppingListData.shopsIcons,
  };
  return jsonData;
};

export const loadData = async function () {
  const { shopping_list } = await apiGet();
  loadDataFromJSON(shopping_list);
};

export const saveData = async function () {
  const data = saveDataToJSON();
  await apiPost(data);
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

export const getShoppingListItemById = function (id) {
  return shoppingListData.shoppingList.find(el => el.id === id);
};

export const toggleChecked = function (item_id) {
  const item = getShoppingListItemById(item_id);
  item.checked = !item.checked;
};
