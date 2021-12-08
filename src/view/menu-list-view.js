import AbstractView from './abstract-view.js';
const createMenuListTemplate = () => (`<div class="main-navigation__items">
</div>`);
export default class MenuListView extends AbstractView {
  get template() {
    return createMenuListTemplate();
  }
}
