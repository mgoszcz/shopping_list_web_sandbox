import moveIcon from 'url:../../icons/swap.png';
import deleteIcon from 'url:../../icons/delete.png';

class ShoppingListView {
  _data;
  _parentElement = document.querySelector('.shopping-list');
  _quantity_input = document.querySelector('.amount-spinner');

  addHandlerClickItem(handler) {
    this._parentElement.addEventListener('click', function (e) {
      console.log(`addHandlerClickItem: ${e.target}`);
      if (e.target.classList.contains('amount-spinner')) return;
      const item = e.target.closest('.shooping-list-item');
      if (!item) return;
      handler(item.dataset.id);
    });
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

  render(data) {
    this._data = data;

    const markup = this._data
      .map(item => {
        return `
        <li class="shooping-list-item ${
          item.ordered ? '' : 'list-item-unordered'
        }" data-id="${item.id}">
          <div class="list-item-content ${item.checked ? 'checked-item' : ''}">
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

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new ShoppingListView();
