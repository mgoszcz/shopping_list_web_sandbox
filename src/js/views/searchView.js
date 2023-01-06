class SearchView {
  _data;
  _parentElement = document.querySelector('.search-combo');
  _searchEntry = document.querySelector('.search__field');
  _dropdown = document.querySelector('.dropdown-content');
  _dropdownList = document.querySelector('.dropdown__articles-list');

  constructor() {
    this._searchEntry.addEventListener(
      'focusin',
      this.displayDropdown.bind(this)
    );
    this._searchEntry.addEventListener(
      'focusout',
      this.hideDropdown.bind(this)
    );
  }

  displayDropdown() {
    console.log('display');
    this._dropdown.classList.remove('hidden');
  }

  hideDropdown() {
    console.log('hide');
    this._dropdown.classList.add('hidden');
  }

  render(data) {
    this._data = data;

    const markup = this._data
      .map(item => {
        return `
        <li>
        <div class="dropdown__article">${item.name}</div>
      </li>
        `;
      })
      .join('');

    this._dropdownList.innerHTML = '';
    this._dropdownList.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new SearchView();
