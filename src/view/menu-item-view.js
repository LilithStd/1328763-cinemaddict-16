import AbstractView from './abstract-view.js';

const createFilter = (filter) => `<a href="#${filter.name}" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`;

const createMenuItemTemplate = (filters) => {
  const currentFilters = filters.reduce((total, current) => total + createFilter(current), '');
  return `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${currentFilters}
    </div>`;
};
export default class MenuItemView extends AbstractView{
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createMenuItemTemplate(this.#filters);
  }

}
