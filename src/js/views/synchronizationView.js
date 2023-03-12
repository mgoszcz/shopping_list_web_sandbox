const synchStatus = {
  synchNeeded: 'Synchronization Needed',
  synched: 'Synched',
  saving: 'Saving',
  synchError: 'Synchronization Error! Refresh Page!',
};

const synchColorClass = {
  synchNeeded: 'load-needed',
  synched: 'synched',
  saving: 'saving',
  synchError: 'synch-error',
};

class SynchronizationView {
  _data;
  _parentElement = document.querySelector('.synchro-monitor');
  _synchText = document.querySelector('.synch-text');

  _removeOtherClasses() {
    const classList = Array.from(this._parentElement.classList);
    if (classList.length > 1) {
      classList
        .filter(item => item != 'synchro-monitor')
        .forEach(item => this._parentElement.classList.remove(item));
    }
  }

  _setStatus(color, text) {
    this._removeOtherClasses();
    this._parentElement.classList.add(color);
    this._synchText.textContent = text;
  }

  setSynchNeededStatus() {
    this._setStatus(synchColorClass.synchNeeded, synchStatus.synchNeeded);
  }

  setSavingStatus() {
    this._setStatus(synchColorClass.saving, synchStatus.saving);
  }

  setSynchedStatus() {
    this._setStatus(synchColorClass.synched, synchStatus.synched);
  }

  setSynchErrorStatus() {
    this._setStatus(synchColorClass.synchError, synchStatus.synchError);
  }
}

export default new SynchronizationView();
