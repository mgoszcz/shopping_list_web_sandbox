import editIcon from 'url:../../icons/draw.png';
import deleteIcon from 'url:../../icons/delete.png';
import confirmIcon from 'url:../../icons/check-mark.png';
import cancelIcon from 'url:../../icons/cancel.png';
import { MessageBoxView } from './messageBoxView';

class articlesView {
  _parentElement = document.querySelector('.articles-window');
  _overlay = document.querySelector('.overlay');
  _buttonClose = this._parentElement.querySelector('.btn--close-modal');
  _articlesList = document.querySelector('.articles-list');
  _addArticleButton = document.querySelector('.articles__add-article-button');

  _messageBox = new MessageBoxView();

  _data;
  _removeArticleHandler;
  _addArticleHandler;
  _editInProgress = false;

  constructor() {
    this._buttonClose.addEventListener('click', this.hideWindow.bind(this));
    this._overlay.addEventListener('click', this.hideWindow.bind(this));
    this._addArticleButton.addEventListener(
      'click',
      this.newArticleField.bind(this)
    );
  }

  showWindow() {
    this._parentElement.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  hideWindow() {
    this._parentElement.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  registerHandlerRemoveArticle(handler) {
    this._removeArticleHandler = handler;
  }

  registerHandlerAddArticles(handler) {
    this._addArticleHandler = handler;
  }

  addHandlerSelectItem() {
    this._articlesList.addEventListener(
      'click',
      function (e) {
        // console.log(e.target);
        if (e.target.closest('.delete-button-container')) {
          console.log('delete');
          const id = e.target.closest('.articles-list-item').dataset.id;
          console.log(id);
          this._removeArticleHandler(id);
          return;
        }
        if (e.target.closest('.new-article-category')) {
        }
      }.bind(this)
    );
  }

  _addHandlerCancelButton() {
    this._parentElement.querySelector('.cancel-button').addEventListener(
      'click',
      function () {
        this._editInProgress = false;
        this.render(this._data);
      }.bind(this)
    );
  }

  _addHandlerAcceptButton() {
    const categoryField = document.querySelector('.new-article-category');
    const itemName = document.querySelector('.new-article-input');
    this._parentElement.querySelector('.confirm-item-button').addEventListener(
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
      }.bind(this)
    );
  }

  render(data) {
    if (this._editInProgress) return;
    this._data = data;
    this._data.sort((a, b) => a.name.localeCompare(b.name));
    console.log(this._data);
    const markup = this._data
      .map(item => {
        console.log(item);
        return `
          <li class="articles-list-item shooping-list-item" data-id=${item.id}>
            <div class="articles-list-item-container list-item-content">
              <div class="item-label-container">
                <span class="item-label">${item.name}</span>
              </div>
              <div class="category-container">
                <span class="category-label">${item.category}</span>
              </div>
              <!--<div class="edit-button-container">
                <img
                  class="list-item-button"
                  src="${editIcon}"
                  alt="Edit"
                />
              </div>-->
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
    this._clearList();
    this._articlesList.insertAdjacentHTML('afterbegin', markup);
    this.addHandlerSelectItem();
  }

  newArticleField() {
    if (this._editInProgress) return;
    this._editInProgress = true;
    const markup = `
      <li class="articles-list-item">
        <div class="articles-list-item-container list-item-content new-list-item">  
            <div class="item-label-container">
                <input class="new-item-name new-article-input"></input>
            </div>
            <div class="category-container">
              <span class="category-label new-article-category" data-category=null>Select category...</span>
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
    this._articlesList.insertAdjacentHTML('afterbegin', markup);
    const newCategoryName = document.querySelector('.new-article-input');
    newCategoryName.focus();
    this._addHandlerAcceptButton();
    this._addHandlerCancelButton();
  }

  _clearList() {
    this._articlesList.innerHTML = '';
  }
}

export default new articlesView();
