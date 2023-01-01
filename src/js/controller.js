/*
TODO
dodac amount na liscie
dorobic reakcje na klikanie
  dodac atrybut 'id' do shopping list item (i do article tez) unikalny i dodac go do html
  po kliknieciu ustawic checked na true na odpowiednim shopping list itemie
  wyrenderowac liste od nowa (na razie)
*/

import { loadData, shoppingListData } from './data/shopping_list_data.js';
import shoppingListView from './views/shoppingListView.js';

console.log('sandbox');

const controlClickItem = function () {
  shoppingListView.render(shoppingListData.shoppingList);
};

const init = async function () {
  const data = await loadData();
  console.log(shoppingListData);

  shoppingListView.render(shoppingListData.shoppingList);

  shoppingListView.addHandlerClickItem(controlClickItem);
};

init();
