import moveIcon from 'url:../../icons/swap.png';
import deleteIcon from 'url:../../icons/delete.png';

class ShoppingListView {
  _data;
  _parentElement = document.querySelector('.shopping-list');

  addHandlerClickItem(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const item = e.target.closest('.shooping-list-item');
      if (!item) return;
      handler(item.dataset.id);
    });
  }

  render(data) {
    this._data = data;

    const markup = this._data
      .map(item => {
        return `
        <li class="shooping-list-item" data-id="${item.id}">
          <div class="list-item-content ${item.checked ? 'checked-item' : ''}">
            <div class="item-label-container">
              <span class="item-label">${item.article.name}</span>
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

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new ShoppingListView();
