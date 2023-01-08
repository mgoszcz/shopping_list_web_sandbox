import {
  generateShoppingListItemId,
  shoppingListData,
} from './shoppingListData';

export default class ShoppingListItem {
  constructor(article, amount = 1, checked = false) {
    this.article = article;
    this.amount = amount;
    this.checked = checked;
    this.id = generateShoppingListItemId(this.article.name);
  }
}

export const getShoppingListItemByName = function (articleName) {
  const newList = shoppingListData.shoppingList.filter(
    item => item.article.name === articleName
  );
  if (newList.length === 0) return null;
  if (newList.length > 1)
    throw new Error('More than one article with the same name found');
  return newList[0];
};

export const addArticleToShoppingList = function (article) {
  shoppingListData.shoppingList.push(new ShoppingListItem(article));
};

export const sortByShop = function () {
  const orderedItems = [];
  shoppingListData.shoppingList.sort((a, b) => {
    if (a.article.name < b.article.name) {
      return -1;
    }
    if (a.article.name > b.article.name) {
      return 1;
    }
    return 0;
  });
  if (!shoppingListData.currentShop) return;
  shoppingListData.currentShop.categoryList.forEach(category => {
    shoppingListData.shoppingList.forEach(item => {
      if (item.article.category === category) orderedItems.push(item);
    });
  });
  const unorderedItems = shoppingListData.shoppingList.filter(
    item => !orderedItems.includes(item)
  );
  console.log(unorderedItems[0]);
  unorderedItems.push(...orderedItems);
  shoppingListData.shoppingList = unorderedItems;
  return;
};
