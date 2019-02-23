export function renderFilter(filterName, count = 0, isChecked = false) {
  let filterState = isChecked ? `checked` : ``;
  if (count === 0) {
    filterState = `disabled`;
  }

  return `
    <input
      type="radio"
      id="filter__${filterName}"
      class="filter__input visually-hidden"
      name="filter"
      ${filterState}
    />
    <label for="filter__${filterName}" class="filter__label">
      ${filterName} <span class="filter__${filterName}-count">${count}</span></label
    >`;
}
