import { shoppingListData } from './shoppingListData';

export const removeUnusedCategories = function () {
  const categoriesToRemove = shoppingListData.categories.filter(category => {
    const filteredArticles = shoppingListData.shoppingArticlesList.filter(
      article => article.category === category
    );
    console.log(category, filteredArticles);
    if (filteredArticles.length === 0) return category;
  });
  console.log(categoriesToRemove);
  categoriesToRemove.forEach(category => {
    const index = shoppingListData.categories.indexOf(category);
    shoppingListData.categories.splice(index, 1);
  });
  console.log(shoppingListData.categories);
};

export const editCategoryName = function (oldName, newName) {
  shoppingListData.categories.push(newName);
  shoppingListData.categories.sort();
  shoppingListData.categories.splice(
    shoppingListData.categories.indexOf(oldName),
    1
  );
  shoppingListData.shoppingArticlesList.forEach(article => {
    if (article.category === oldName) article.category = newName;
  });
  shoppingListData.shops.forEach(shop => {
    const oldNameIndex = shop.categoryList.indexOf(oldName);
    if (oldNameIndex !== -1) shop.categoryList[oldNameIndex] = newName;
  });
};
