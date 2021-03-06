class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  render() {
    this._element = this.createElement(this.template);
    this.createListeners();
    return this._element;
  }

  update() {}

  createListeners() {}

  removeListeners() {}

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }
}
export default Component;
