import editIcon from 'url:../../icons/draw.png';
import removeIcon from 'url:../../icons/delete.png';

class shopSelectorView {
  _parentElement = document.querySelector('.shops-window');
  _overlay = document.querySelector('.overlay');
  _buttonClose = document.querySelector('.shops-close-button');
  _shopsList = this._parentElement.querySelector('.shop-list');
  _data;

  constructor() {
    this._overlay.addEventListener('click', this.hideWindow.bind(this));
    this._buttonClose.addEventListener('click', this.hideWindow.bind(this));
  }

  showWindow(data) {
    console.log(this._shopsList);
    this._data = data;
    this._parentElement.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
    this._render();
  }

  hideWindow() {
    this._parentElement.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _render() {
    const markup = this._data
      .map(item => {
        return `
        <li class="shop-list-item">
            <div class="shop-list-item-content list-item-content">
              <div class="shop-label-container">
                <span class="shop_name">${item.name}</span>
              </div>
              <div class="edit-shop-container">
                <img
                  class="edit-shop-button list-item-button"
                  src="${editIcon}"
                  alt="Edit"
                />
              </div>
              <div class="remove-shop-container">
                <img
                  class="remove-shop-button list-item-button"
                  src="${removeIcon}"
                  alt="Delete"
                />
              </div>
            </div>
        </li>
        `;
      })
      .join('');
    this._clearList();
    this._shopsList.insertAdjacentHTML('afterbegin', markup);
  }

  _clearList() {
    this._shopsList.innerHTML = '';
  }

  addHandlerClickItem(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        if (e.target.closest('.shop-label-container')) {
          const newName = e.target
            .closest('.shop-label-container')
            .querySelector('.shop_name').textContent;
          if (handler(newName) === false) return;
          this.hideWindow();
        }
      }.bind(this)
    );
  }
}

export default new shopSelectorView();
