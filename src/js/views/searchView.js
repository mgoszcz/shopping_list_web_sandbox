class SearchView {
  _data;
  _parentElement = document.querySelector('.search-combo');
  _searchEntry = document.querySelector('.search__field');
  _dropdown = document.querySelector('.dropdown-content');
  _dropdownList = document.querySelector('.dropdown__articles-list');
  _focusInHnadler;
  _keyPressHandler;

  constructor() {
    this._searchEntry.addEventListener(
      'focusout',
      this.hideDropdown.bind(this)
    );
    this._dropdown.addEventListener(
      'click',
      this.dropdownSelectItem.bind(this)
    );
  }

  addHandlerFocusIn(handler) {
    this._focusInHnadler = handler;
    this._searchEntry.addEventListener(
      'focusin',
      this.focusInActions.bind(this)
    );
  }

  addHandlerKeyPress(handler) {
    this._keyPressHandler = handler;
    this._searchEntry.addEventListener(
      'input',
      this.keyPressActions.bind(this)
    );
  }

  dropdownSelectItem(e) {
    console.log(e.target);
  }

  focusInActions() {
    const searchFieldValue = this._searchEntry.value;
    this._focusInHnadler(searchFieldValue);
    console.log(this._dropdownList.style.height);
  }

  keyPressActions() {
    const searchFieldValue = this._searchEntry.value;
    this._keyPressHandler(searchFieldValue);
  }

  displayDropdown() {
    console.log('display');
    this._dropdown.classList.remove('hidden');
  }

  hideDropdown() {
    console.log(document.activeElement);
    if (document.activeElement === this._dropdownList) return;
    // this._dropdown.classList.add('hidden');
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
