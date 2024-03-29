import AbstractView from './abstract-view.js';

export default class SmartView extends AbstractView {
  _data = {};

  // Метод updateData, который будет обновлять данные в свойстве _data, а потом вызывать обновление шаблона
  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    if (justDataUpdating) {
      // console.log('update complete');
      return;

    }

    this.updateElement();
  }

  // Метод updateElement, его задача удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  // "Фокус" в том, что при генерации нового элемента будет снова зачитано свойство _data.
  // И если мы сперва обновим его, а потом шаблон, то в итоге получим элемент с новыми данными
  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    newElement.scrollTop = this._data.scrollPosition;

    this.restoreHandlers();

  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
