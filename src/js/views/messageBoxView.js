export class MessageBoxView {
  _parentElement = document.querySelector('.message-box');
  _closeButton = document.querySelector('.close-message');
  _text;
  _timeout;

  constructor() {
    this._closeButton.addEventListener('click', this.hide.bind(this));
  }

  _startTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(this.hide.bind(this), 5000);
  }

  setText(text) {
    this._text = text;
  }

  display(text = '') {
    if (text) this.setText(text);
    this._parentElement.querySelector('.message-text').textContent = this._text;
    this._parentElement.classList.remove('hidden');
    this._startTimeout();
  }

  hide() {
    this._parentElement.classList.add('hidden');
    clearTimeout(this._timeout);
    this._timeout = null;
  }
}
