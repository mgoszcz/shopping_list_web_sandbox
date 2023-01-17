import confirmIcon from 'url:../../icons/check-mark.png';
import editIcon from 'url:../../icons/draw.png';

class categoriesView {
  _parentElement = document.querySelector('.categories-window');
  _overlay = document.querySelector('.overlay');
  _buttonClose = document.querySelector('.btn--close-modal');
  _categoriesList = document.querySelector('.categories__list');
  _newCategoryButton = document.querySelector(
    '.categories__add-category-button'
  );
  _data;
  _shoppingListItemId;

  constructor() {
    this._buttonClose.addEventListener('click', this.hideWindow.bind(this));
    this._overlay.addEventListener('click', this.hideWindow.bind(this));
    this._newCategoryButton.addEventListener(
      'click',
      this.newCategoryField.bind(this)
    );
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
        const parentItem = e.target.closest('.new-category-item');
        if (parentItem) return;
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
                </div>
            </li>
        `;
      })
      .join('');
    this._clearList();
    this._categoriesList.insertAdjacentHTML('afterbegin', markup);
  }

  newCategoryField() {
    const markup = `
        <li class="categories__list-item">
        <div class="categories__category_item list-item-content new-category-item">
            <div class="category-label-container">
                <input class="categories__new_category_name"></input>
            </div>
            <div class="confirm-category-container">
                <img
                class="confirm-category-button list-item-button"
                src="${confirmIcon}"
                alt="Confirm"
                />
            </div>
        </div>
    </li>
    `;
    this._categoriesList.insertAdjacentHTML('afterbegin', markup);
    const newCategoryName = document.querySelector(
      '.categories__new_category_name'
    );
    newCategoryName.focus();
  }

  _clearList() {
    this._categoriesList.innerHTML = '';
  }
}

export default new categoriesView();
