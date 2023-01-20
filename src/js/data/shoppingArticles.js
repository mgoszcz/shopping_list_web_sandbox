import { generateArticleId, shoppingListData } from './shoppingListData';

const removeDiacritics = require('diacritics').remove;

export class ShoppingArticle {
  constructor(name, category, selection = 1, amount = 1) {
    this.name = name;
    this.category = category;
    this.selection = selection;
    this.amount = amount;
    this.id = generateArticleId(this.name);
  }
}

export const filterArticles = function (filterText) {
  const result = shoppingListData.shoppingArticlesList.filter(
    item => item.name.toLowerCase() === filterText.toLowerCase()
  );
  result.push(
    ...shoppingListData.shoppingArticlesList.filter(
      item =>
        !result.includes(item) &&
        item.name.toLowerCase().includes(filterText.toLowerCase())
    )
  );
  result.push(
    ...shoppingListData.shoppingArticlesList.filter(
      item =>
        !result.includes(item) &&
        removeDiacritics(item.name)
          .toLowerCase()
          .includes(removeDiacritics(filterText.toLowerCase()))
    )
  );
  return result;
};

export const getArticleByName = function (articleName) {
  const newList = shoppingListData.shoppingArticlesList.filter(
    item => item.name === articleName
  );
  console.log(newList);
  if (newList.length === 0) return null;
  if (newList.length > 1)
    throw new Error('More than one article with the same name found');
  return newList[0];
};
