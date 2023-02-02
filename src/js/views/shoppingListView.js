import moveIcon from 'url:../../icons/swap.png';
import deleteIcon from 'url:../../icons/delete.png';
import confirmIcon from 'url:../../icons/check-mark.png';
import cancelIcon from 'url:../../icons/cancel.png';
import { MessageBoxView } from './messageBoxView';

class ShoppingListView {
  _data;
  _parentElement = document.querySelector('.shopping-list');
  _quantity_input = document.querySelector('.amount-spinner');
  _overlayHard = document.querySelector('.overlay-hard');
  _addingItemInProgress = false;
  _messageBox = new MessageBoxView();
  _categoryHandler;
  _removeItemHandler;
  _submitItemHandler;

  addHandlerClickItem(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        console.log(`addHandlerClickItem: ${e.target}`);
        if (e.target.classList.contains('amount-spinner')) return;
        if (e.target.classList.contains('category-label')) {
          this.selectCategory(e.target);
          return;
        }
        if (e.target.closest('.delete-button-container')) {
          this.removeItem(e.target);
          return;
        }
        const item = e.target.closest('.shooping-list-item');
        if (!item) return;
        if (item.dataset.id === 'NewShoppingListItem') return;
        handler(item.dataset.id);
      }.bind(this)
    );
  }

  selectCategory(target) {
    this._categoryHandler(target.closest('.shooping-list-item').dataset.id);
  }

  setCategoryHandler(handler) {
    this._categoryHandler = handler;
  }

  registerRemoveItemHandler(handler) {
    this._removeItemHandler = handler;
  }

  addHandlerSetQuantity(handler) {
    const input = this._parentElement.querySelector('.amount-spinner');
    this._parentElement.addEventListener('change', function (e) {
      const item = e.target.closest('.amount-spinner');
      if (!item) return;
      const container = e.target.closest('.shooping-list-item');
      handler(container.dataset.id, item.value);
    });
  }

  _addHandlerCancelItem() {
    const cancelButton = document.querySelector('.cancel-button');
    console.log(cancelButton);
    cancelButton.addEventListener(
      'click',
      function (e) {
        console.log(e.target);
        this._addingItemInProgress = false;
        this.render(this._data);
        this._overlayHard.classList.add('hidden');
      }.bind(this)
    );
  }

  _addHandlerSubmitItem() {
    const submitButton = document.querySelector('.confirm-item-button');
    const categoryField = document.querySelector('.new-item-category');
    const itemName = document.querySelector('.new-list-item-input');
    submitButton.addEventListener(
      'click',
      function () {
        if (!itemName.value & (categoryField.dataset.category === 'null')) {
          console.log('err');
          itemName.classList.add('error-input');
          categoryField.classList.add('label-errored');
          this._messageBox.display(
            'Article name cannot be empty\nCategory is not selected'
          );
          return;
        }
        if (!itemName.value) {
          console.log('err');
          itemName.classList.add('error-input');
          this._messageBox.display('Article name cannot be empty');
          return;
        }
        if (categoryField.dataset.category === 'null') {
          categoryField.classList.add('label-errored');
          this._messageBox.display('Category is not selected');
          return;
        }
        this._addingItemInProgress = false;
        const submitItemStatus = this._submitItemHandler(
          itemName.value,
          categoryField.dataset.category
        );
        if (submitItemStatus == 1) {
          this._addingItemInProgress = true;
          itemName.classList.add('error-input');
          this._messageBox.display('Item already exists on shopping list');
          return;
        } else if (submitItemStatus == 2) {
          this._addingItemInProgress = true;
          itemName.classList.add('error-input');
          this._messageBox.display('Item already exists on articles list');
          return;
        } else this._overlayHard.classList.add('hidden');
      }.bind(this)
    );
  }

  registerSubmitItemHandler(handler) {
    this._submitItemHandler = handler;
  }

  removeItem(item) {
    const id = item.closest('.shooping-list-item').dataset.id;
    this._removeItemHandler(id);
  }

  render(data) {
    if (this._addingItemInProgress) return;
    this._data = data;

    const markup = this._data
      .map(item => {
        return `
        <li class="shooping-list-item ${
          item.ordered ? '' : 'list-item-unordered'
        }" data-id="${item.id}">
          <div class="shopping-list-item-container list-item-content ${
            item.checked ? 'checked-item' : ''
          }">
            <div class="item-label-container">
              <span class="item-label">${item.article.name}</span>
            </div>
            <div class="amount-container">
              <input
                type="number"
                class="amount-spinner"
                min="1"
                step="1"
                value="${item.amount}"
              />
            </div>
            <div class="category-container">
              <span class="category-label">${item.article.category}</span>
            </div>
            <div class="move-button-container">
              <img
                class="list-item-button"
                src="${moveIcon}"
                alt="Move"
              />
            </div>
            <div class="delete-button-container">
              <img
                class="list-item-button"
                src="${deleteIcon}"
                alt="Delete"
              />
            </div>
          </div>
        </li>
        `;
      })
      .join('');
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderNewItem(newItemName) {
    const markup = `
    <li class="shooping-list-item" data-id="NewShoppingListItem">
      <div class="shopping-list-item-container list-item-content new-list-item">  
        <div class="item-label-container">
            <input class="new-item-name new-list-item-input"></input>
        </div>
        <div class="category-container">
          <span class="category-label new-item-category" data-category=null>Select category...</span>
        </div>
        <div class="confirm-item-button">
            <img
            class="list-item-button"
            src="${confirmIcon}"
            alt="Confirm"
            />
        </div>
        <div class="cancel-button">
            <img
            class="list-item-button"
            src="${cancelIcon}"
            alt="Cancel"
            />
        </div>
      </div>
    </li>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    const input = document.querySelector('.new-list-item-input');
    input.value = newItemName;
    input.focus();
    input.select();
    this._addHandlerCancelItem();
    this._addHandlerSubmitItem();
    this._overlayHard.classList.remove('hidden');
    this._addingItemInProgress = true;
  }

  setNewItemCategory(categoryName) {
    const categoryField = document.querySelector('.new-item-category');
    categoryField.textContent = categoryName;
    categoryField.dataset.category = categoryName;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new ShoppingListView();
