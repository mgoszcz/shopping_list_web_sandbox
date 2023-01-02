import { generateShoppingListItemId } from './shoppingListData';

export default class ShoppingListItem {
  constructor(article, amount, checked) {
    this.article = article;
    this.amount = amount;
    this.checked = checked;
    this.id = generateShoppingListItemId(this.article.name);
  }
}
