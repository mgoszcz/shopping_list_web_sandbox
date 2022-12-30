const URL = "http://mgoszcz.pythonanywhere.com/shopping_list";

export const shoppingListData = {
  categories: [],
  currentShop: null,
  shoppingArticlesList: [],
  shoppingList: [],
  shops: [],
  shopsIcons: [],
};

export const loadData = async function () {
  try {
    const resp = await fetch(URL);
    const data = await resp.json();
    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
    const shoppingListJson = data.shopping_list;
    shoppingListData.categories = shoppingListJson.categories;
    shoppingListData.currentShop = shoppingListJson.current_shop;
    shoppingListData.shoppingArticlesList =
      shoppingListJson.shopping_articles_list;
    shoppingListData.shoppingList = shoppingListJson.shopping_list;
    shoppingListData.shops = shoppingListJson.shops;
    shoppingListData.shopsIcons = shoppingListJson.shops_icons;
  } catch (err) {
    throw err;
  }
};
