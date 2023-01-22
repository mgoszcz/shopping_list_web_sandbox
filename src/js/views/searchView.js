function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

class SearchView {
  _data;
  _parentElement = document.querySelector('.search-combo');
  _searchEntry = document.querySelector('.search__field');
  _dropdown = document.querySelector('.dropdown-content');
  _dropdownList = document.querySelector('.dropdown__articles-list');
  _dropdownDiv = document.querySelector('.add-item-dropdown');
  _addButton = document.querySelector('.search__btn');
  _focusInHnadler;
  _keyPressHandler;
  _addButtonHandler;

  constructor() {
    document.addEventListener('click', this.hideDropdown.bind(this));
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

  addHandlerButtonPress(handler) {
    this._addButtonHandler = handler;
    this._parentElement.addEventListener(
      'submit',
      this.addButtonActions.bind(this)
    );
  }

  addButtonActions(e) {
    console.log(e);
    e.preventDefault();
    const searchFieldValue = this._searchEntry.value;
    if (!searchFieldValue) return;
    this._addButtonHandler(searchFieldValue);
    this._hideDropdown();
    this._searchEntry.value = '';
  }

  dropdownSelectItem(e) {
    const item = e.target;
    console.log(item);
    if (item.classList.contains('dropdown__article')) {
      this._searchEntry.value = item.textContent;
      this._hideDropdown();
    }
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
    this._dropdownDiv.style.height = '50%';
  }

  async hideDropdown(e) {
    // console.log(e);
    // console.log(this._parentElement.contains(e.target));
    if (
      this._parentElement.contains(e.target) &&
      e.target !== this._dropdownDiv
    )
      return;
    this._hideDropdown();
  }

  _hideDropdown() {
    if (!this._dropdown.classList.contains('hidden')) {
      this._dropdown.classList.add('hidden');
      this._dropdownDiv.style.height = '0px';
    }
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
