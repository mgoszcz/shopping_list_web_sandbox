import { apiGet } from './api';
import Shop from './shop';
import ShoppingListItem from './shoppingListItem';
import { ShoppingArticle } from './shopping_articles';

export const shoppingListData = {
  categories: [],
  currentShop: null,
  shoppingArticlesList: [],
  shoppingList: [],
  shops: [],
  shopsIcons: [],
};

const loadArticles = function (articles) {
  const articlesList = [];
  articles.forEach(article => {
    articlesList.push(new ShoppingArticle(article.name, article.category));
  });
  return articlesList;
};

const loadShoppingList = function (shoppingListItems) {
  const shoppingList = [];
  shoppingListItems.forEach(item => {
    const article = shoppingListData.shoppingArticlesList.find(
      shoppingArticle => shoppingArticle.name === item.article_name
    );
    shoppingList.push(new ShoppingListItem(article, item.amount, item.checked));
  });
  return shoppingList;
};

const loadShops = function (shops) {
  const shopsList = [];
  shops.forEach(shop =>
    shopsList.push(new Shop(shop.name, shop.logo, shop.category_list))
  );
  return shopsList;
};

export const loadDataFromJSON = function (jsonData) {
  shoppingListData.categories = jsonData.categories;
  shoppingListData.shoppingArticlesList = loadArticles(
    jsonData.shopping_articles_list
  );
  shoppingListData.shoppingList = loadShoppingList(jsonData.shopping_list);
  shoppingListData.shops = loadShops(jsonData.shops);
  shoppingListData.currentShop = shoppingListData.shops.find(
    shop => shop.name === jsonData.current_shop
  );
  shoppingListData.shopsIcons = jsonData.shops_icons;
};

export const loadData = async function () {
  const { shopping_list } = await apiGet();
  loadDataFromJSON(shopping_list);
};
