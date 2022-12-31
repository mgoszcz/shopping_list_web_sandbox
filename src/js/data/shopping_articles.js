export class ShoppingArticle {
  constructor(name, category, selection = 1, amount = 1) {
    this.name = name;
    this.category = category;
    this.selection = selection;
    this.amount = amount;
  }
}
