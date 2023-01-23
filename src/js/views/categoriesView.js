import confirmIcon from 'url:../../icons/check-mark.png';
import cancelIcon from 'url:../../icons/cancel.png';
import editIcon from 'url:../../icons/draw.png';

class categoriesView {
  _parentElement = document.querySelector('.categories-window');
  _overlay = document.querySelector('.overlay');
  _buttonClose = document.querySelector('.btn--close-modal');
  _categoriesList = document.querySelector('.categories__list');
  _newCategoryButton = document.querySelector(
    '.categories__add-category-button'
  );
  _editInProgress = false;
  _data;
  _shoppingListItemId;
  _addCategoryHandler;
  _editCategoryHandler;

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
    this._editInProgress = false;
  }

  addHandlerSelectItem(handler) {
    this._categoriesList.addEventListener(
      'click',
      function (e) {
        const parentItem = e.target.closest('.new-category-item');
        if (parentItem) return;
        let item = e.target.closest('.category-label-container');
        if (item) this._selectItem(item, handler);
        item = e.target.closest('.edit-category-button');
        if (item) this._editItem(item);
      }.bind(this)
    );
  }

  _selectItem(item, handler) {
    if (this._editInProgress) return;
    handler(
      this._shoppingListItemId,
      item.querySelector('.categories__category_name').textContent
    );
  }

  _editItem(item, handler) {
    console.log('edit');
    if (this._editInProgress) return;
    this._editInProgress = true;
    const listItem = item.closest('.categories__list-item');
    const oldCategoryName = listItem.dataset.name;
    console.log(oldCategoryName);
    const markup = `
        <div class="categories__category_item list-item-content new-list-item">
            <form class="new-item-form">    
                <div class="category-label-container">
                    <input class="new-item-name new-category-input"></input>
                </div>
                <button class="confirm-item-button category-button">
                    <img
                    class="button-image"
                    src="${confirmIcon}"
                    alt="Confirm"
                    />
                </button>
            </form>
            <button class="cancel-button category-button">
                <img
                class="button-image"
                src="${cancelIcon}"
                alt="Cancel"
                />
            </button>
        </div>
    `;
    listItem.innerHTML = '';
    listItem.insertAdjacentHTML('afterbegin', markup);
    const input = document.querySelector('.new-category-input');
    input.value = oldCategoryName;
    input.focus();
    input.select();
    this.addHandlerCancelButton();
    this.addHandlerEditCategory(oldCategoryName);
  }

  registerAddCategoryHandler(handler) {
    this._addCategoryHandler = handler;
  }

  registerEditCategoryHandler(handler) {
    this._editCategoryHandler = handler;
  }

  addHandlerEditCategory(oldCategoryName) {
    document.querySelector('.new-item-form').addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const input = document.querySelector('.new-category-input');
        const newCategoryName = input.value;
        if (!newCategoryName) return;
        if (newCategoryName === oldCategoryName) return;
        if (!this._editCategoryHandler(oldCategoryName, newCategoryName))
          return;
        this.findCategoryAndScroll(newCategoryName);
        this._editInProgress = false;
      }.bind(this)
    );
  }

  addHandlerAddNewCategory() {
    const form = document.querySelector('.new-item-form');
    const input = document.querySelector('.new-category-input');
    form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const newCategory = input.value;
        if (!this._addCategoryHandler(newCategory)) {
          console.log('Insert correct category name');
          return;
        }
        this.findCategoryAndScroll(newCategory);
        this._editInProgress = false;
      }.bind(this)
    );
  }

  addHandlerCancelButton() {
    const button = document.querySelector('.cancel-button');
    button.addEventListener(
      'click',
      function () {
        this.render(this._data);
        this._editInProgress = false;
      }.bind(this)
    );
  }

  findCategoryAndScroll(categoryName) {
    const items = Array.from(
      document.querySelectorAll('.categories__list-item')
    );
    const filtered = items.filter(item => item.dataset.name === categoryName);
    if (filtered) filtered[0].scrollIntoView();
  }

  render(data) {
    this._data = data;
    const markup = this._data
      .map(item => {
        return `
            <li class="categories__list-item" data-name="${item}">
                <div class="categories__category_item list-item-content">
                    <div class="category-label-container">
                        <span class="categories__category_name">${item}</span>
                    </div>
                    <button class="edit-category-button category-button">
                        <img
                        class="button-image"
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
    if (this._editInProgress) return;
    this._editInProgress = true;
    const markup = `
        <li class="categories__list-item">
        <div class="categories__category_item list-item-content new-list-item">
            <form class="new-item-form">    
                <div class="category-label-container">
                    <input class="new-item-name new-category-input"></input>
                </div>
                <button class="confirm-item-button category-button">
                    <img
                    class="button-image"
                    src="${confirmIcon}"
                    alt="Confirm"
                    />
                </button>
            </form>
            <button class="cancel-button category-button">
                <img
                class="button-image"
                src="${cancelIcon}"
                alt="Cancel"
                />
            </button>
        </div>
    </li>
    `;
    this._categoriesList.insertAdjacentHTML('afterbegin', markup);
    const newCategoryName = document.querySelector('.new-category-input');
    newCategoryName.focus();
    this.addHandlerAddNewCategory();
    this.addHandlerCancelButton();
  }

  _clearList() {
    this._categoriesList.innerHTML = '';
  }
}

export default new categoriesView();
