import previewView from './previewView.js';
import views from './views.js';

class bookmarkView extends views {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet, find the nice recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
