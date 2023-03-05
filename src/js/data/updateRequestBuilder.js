export const dataSetModel = {
  shopping_list: 'shopping_list',
  shopping_articles_list: 'shopping_articles_list',
  categories: 'categories',
  shops: 'shops',
  current_shop: 'current_shop',
  shop_icon: 'shop_icon',
};

export const actionsModel = {
  remove: 'remove',
  add: 'add',
  update: 'update',
};

export class UpdateRequestBuilder {
  _requestFields = {
    data_set: null,
    item: null,
    action: null,
    data: null,
  };

  set_data_set(data_set_name) {
    this._requestFields.data_set = data_set_name;
    return this;
  }

  set_item_name(item_name) {
    this._requestFields.item = item_name;
    return this;
  }

  set_action(action_name) {
    this._requestFields.action = action_name;
    return this;
  }

  set_data(data_to_set) {
    this._requestFields.data = data_to_set;
    return this;
  }

  build() {
    return this._requestFields;
  }
}
