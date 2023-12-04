import shopSelectorView from './shopSelectorView';

class MenuView {
  _parentElement = document.querySelector('.menu-buttons');
  _currentShopName = document.querySelector('.current-shop-name');
  _shoppingListData;

  constructor() {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.menu-shop-button');
        if (!target) return;
        shopSelectorView.showWindow(this._shoppingListData.shops);
      }.bind(this)
    );
  }

  initializeMenu(shoppingListData) {
    this._shoppingListData = shoppingListData;
  }

  addHandlerDeleteAll(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.menu-delete-all-button');
      if (!target) return;
      handler();
    });
  }

  displayCurrentShop() {
    this._currentShopName.textContent = this._shoppingListData.currentShop.name;
  }
}

export default new MenuView();
