import deleteIcon from 'url:../../icons/delete.png';
import editIcon from 'url:../../icons/draw.png';

class categoriesView {
  _parentElement = document.querySelector('.categories-window');
  _overlay = document.querySelector('.overlay');
  _buttonClose = document.querySelector('.btn--close-modal');
  _categoriesList = document.querySelector('.categories__list-item');
  _data;
  _shoppingListItemId;

  constructor() {
    this._buttonClose.addEventListener('click', this.hideWindow.bind(this));
    this._overlay.addEventListener('click', this.hideWindow.bind(this));
  }

  showWindow(itemId) {
    this._parentElement.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
    this._shoppingListItemId = itemId;
    console.log(this._shoppingListItemId);
  }

  hideWindow() {
    this._parentElement.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  addHandlerSelectItem(handler) {
    this._categoriesList.addEventListener(
      'click',
      function (e) {
        const item = e.target.closest('.category-label-container');
        if (!item) return;
        handler(
          this._shoppingListItemId,
          item.querySelector('.categories__category_name').textContent
        );
      }.bind(this)
    );
  }

  render(data) {
    this._data = data;
    const markup = this._data
      .map(item => {
        return `
            <li class="categories__list-item">
                <div class="categories__category_item list-item-content">
                    <div class="category-label-container">
                        <span class="categories__category_name">${item}</span>
                    </div>
                    <div class="edit-category-container">
                        <img
                        class="edit-category-button list-item-button"
                        src="${editIcon}"
                        alt="Edit"
                        />
                    </div>
                    <div class="remove-category-container">
                        <img
                        class="remove-category-button list-item-button"
                        src="${deleteIcon}"
                        alt="Delete"
                        />
                    </div>
                </div>
            </li>
        `;
      })
      .join('');
    this._clearList();
    this._categoriesList.insertAdjacentHTML('afterbegin', markup);
  }

  _clearList() {
    this._categoriesList.innerHTML = '';
  }
}

export default new categoriesView();
