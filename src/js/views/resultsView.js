import previewView from './previewView.js';
import views from './views.js';

class resultsView extends views {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'no recipe found for your query. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
