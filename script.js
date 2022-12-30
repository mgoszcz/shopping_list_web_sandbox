"use strict";

import { loadData, shoppingListData } from "./api";

console.log("sandbox");

const init = async function () {
  const data = await loadData();
  console.log(shoppingListData);
};

init();
