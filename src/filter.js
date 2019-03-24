import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._id = data.id;
    this._count = data.count;
    this._state.isChecked = this._count && data.isChecked;
    this._state.isDisabled = !this._count && true;
    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  createListeners() {
    this._element.querySelector(`.filter__input`)
      .addEventListener(`click`, this._onFilterClick);
  }

  removeListeners() {
    this._element.querySelector(`.filter__input`)
      .removeEventListener(`click`, this._onFilterClick);
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  createElement(template) { // Костыль. Переопределяем, чтобы инпут с лейблом были в элементе
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement;
  }

  get template() {
    return `
    <input
      type="radio"
      id="${this._id}"
      class="filter__input visually-hidden"
      name="filter"
      ${ this._state.isChecked && `checked` }
      ${ this._state.isDisabled && `disabled` }
    />
    <label for="${this._id}" class="filter__label">
      ${this._title} <span class="filter__${this._title}-count">${this._count}</span></label
    >`.trim();
  }
}

export default Filter;
