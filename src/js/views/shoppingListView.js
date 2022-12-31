class ShoppingListView {
  _data;
  _parentElement = document.querySelector('.shopping-list');

  render(data) {
    this._data = data;

    const markup = this._data
      .map(item => {
        return `
        <li class="shooping-list-item">
          <div class="list-item-content">
            <div class="item-label-container">
              <span class="item-label">${item.article.name}</span>
            </div>
            <div class="category-container">
              <span class="category-label">${item.article.category}</span>
            </div>
            <div class="move-button-container">M</div>
            <div class="delete-button-container">X</div>
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
