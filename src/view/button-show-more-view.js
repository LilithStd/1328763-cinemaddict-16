import AbstractView from './abstract-view.js';
const createButtonShowMore = () => (`<button class="films-list__show-more">
Show more</button>`);
export default class ButtonShowMoreView extends AbstractView {
  get template() {
    return createButtonShowMore();
  }
}
