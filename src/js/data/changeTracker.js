import {
  actionsModel,
  dataSetModel,
  UpdateRequestBuilder,
} from './updateRequestBuilder';

class ChangeTracker {
  _changesRequests = [];

  constructor() {}

  deleteArticle(article_name) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_articles_list)
        .set_item_name(article_name)
        .set_action(actionsModel.remove)
        .build()
    );
    console.log(this._changesRequests);
  }

  addArticle(article) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_articles_list)
        .set_item_name(article.name)
        .set_action(actionsModel.add)
        .set_data({ name: article.name, category: article.category })
        .build()
    );
    console.log(this._changesRequests);
  }

  updateArticleCategory(article) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_articles_list)
        .set_item_name(article.name)
        .set_action(actionsModel.update)
        .set_data({ category: article.category })
        .build()
    );
    console.log(this._changesRequests);
  }

  removeShopppingListItem(shoppingListItem) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_list)
        .set_item_name(shoppingListItem.article.name)
        .set_action(actionsModel.remove)
        .build()
    );
    console.log(this._changesRequests);
  }

  addShoppingListItem(shoppingListItem) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_list)
        .set_item_name(shoppingListItem.article.name)
        .set_action(actionsModel.add)
        .set_data({
          article_name: shoppingListItem.article.name,
          amount: shoppingListItem.amount,
          checked: shoppingListItem.checked,
        })
        .build()
    );
    console.log(this._changesRequests);
  }

  changeShoppingListItemAmount(shoppingListItem) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_list)
        .set_item_name(shoppingListItem.article.name)
        .set_action(actionsModel.update)
        .set_data({ amount: shoppingListItem.amount })
        .build()
    );
    console.log(this._changesRequests);
  }

  clickShoppingListItem(shoppingListItem) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shopping_list)
        .set_item_name(shoppingListItem.article.name)
        .set_action(actionsModel.update)
        .set_data({ checked: shoppingListItem.checked })
        .build()
    );
    console.log(this._changesRequests);
  }

  addCategory(category) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.categories)
        .set_item_name(category)
        .set_action(actionsModel.add)
        .build()
    );
    console.log(this._changesRequests);
  }

  removeCategory(category) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.categories)
        .set_item_name(category)
        .set_action(actionsModel.remove)
        .build()
    );
    console.log(this._changesRequests);
  }

  removeShop(shop) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shops)
        .set_item_name(shop.name)
        .set_action(actionsModel.remove)
        .build()
    );
  }

  addShop(shop) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shops)
        .set_item_name(shop.name)
        .set_action(actionsModel.add)
        .set_data({
          name: shop.name,
          logo: shop.logo,
          category_list: shop.category_list,
        })
        .build()
    );
    console.log(this._changesRequests);
  }

  updateShopLogo(shop) {
    new Error('Update logo request is not implemented');
  }

  updateShopCategories(shop) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.shops)
        .set_item_name(shop.name)
        .set_action(actionsModel.update)
        .set_data({ category_list: shop.category_list })
        .build()
    );
    console.log(this._changesRequests);
  }

  updateCurrentShop(current_shop_name) {
    this._changesRequests.push(
      new UpdateRequestBuilder()
        .set_data_set(dataSetModel.current_shop)
        .set_item_name(current_shop_name)
        .set_action(actionsModel.update)
        .build()
    );
    console.log(this._changesRequests);
  }

  getRequest() {
    return this._changesRequests;
  }

  clearRequests() {
    this._changesRequests = [];
  }
}

export const changeTracker = new ChangeTracker();
