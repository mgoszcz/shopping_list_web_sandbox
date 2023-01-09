class MenuView {
  _parentElement = document.querySelector('.menu-buttons');
  addHandlerDeleteAll(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.menu-delete-all-button');
      if (!target) return;
      handler();
    });
  }
}

export default new MenuView();
