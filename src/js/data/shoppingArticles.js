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
    item => item.name === filterText
  );
  result.push(
    ...shoppingListData.shoppingArticlesList.filter(
      item => !result.includes(item) && item.name.includes(filterText)
    )
  );
  result.push(
    ...shoppingListData.shoppingArticlesList.filter(
      item =>
        !result.includes(item) &&
        removeDiacritics(item.name).includes(removeDiacritics(filterText))
    )
  );
  return result;
};
