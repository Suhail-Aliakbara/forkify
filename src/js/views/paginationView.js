import icons from '../../img/icons.svg';
import views from './views.js';
class paginationView extends views {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); // Calculates the total number of pages
    const currPage = this._data.page; // Current page

    // Case 1: Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Case 2: Last page
    if (currPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
      `;
    }

    // Case 3: Other pages
    if (currPage < numPages) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currPage - 1}</span>
        </button>
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Case 4: Page 1, and there are no other pages
    return '';
  }
}

export default new paginationView();
