class MenuView {
  _parentElement = document.querySelector('.menu-buttons');
  _currentShopName = document.querySelector('.current-shop-name');
  addHandlerDeleteAll(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.menu-delete-all-button');
      if (!target) return;
      handler();
    });
  }

  displayCurrentShop(data) {
    this._currentShopName.textContent = data;
  }
}

export default new MenuView();
