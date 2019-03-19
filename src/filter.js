import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._id = data.id;
    this._count = data.count;
    this._state.isChecked = data.isChecked;
    this._state.isDisabled = false;
    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _setState() {
    if (this._count === 0) {
      this._state.isDisabled = true;
      this._state.isChecked = false;
    }
  }

  createListeners() {
    // this._element.querySelector(`.card__btn--edit`)
    //   .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    // this._element.querySelector(`.card__btn--edit`)
    //     .removeEventListener(`click`, this._onEditButtonClick);
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
    <input
      type="radio"
      id="${this._id}"
      class="filter__input visually-hidden"
      name="filter"
      ${ this._state.isChecked || `checked` }
      ${ this._state.isDisabled || `disabled` }
    />
    <label for="${this._id}" class="filter__label">
      ${this._title} <span class="filter__${this._title}-count">${this._count}</span></label
    >`.trim();
  }
}

export default Filter;
