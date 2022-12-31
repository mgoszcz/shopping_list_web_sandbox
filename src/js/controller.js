import { loadData, shoppingListData } from './data/shopping_list_data.js';
import shoppingListView from './views/shoppingListView.js';

console.log('sandbox');

const init = async function () {
  const data = await loadData();
  console.log(shoppingListData);

  shoppingListView.render(shoppingListData.shoppingList);
};

init();
