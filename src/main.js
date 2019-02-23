import {Card} from './make-task.js';
import {renderFilter} from './make-filter.js';

const boardTasks = document.querySelector(`.board__tasks`);

function renderCards(amount) {
  let result = ``;
  for (let i = 0; i < amount; i++) {
    let card = new Card(`This is a random generated card`, [`repeat`, `cinema`, `entertaiment`], `pink`, i);
    card.renderCard();
    result += card.render;
  }
  boardTasks.innerHTML = result;
}

const mainFilter = document.querySelector(`.main__filter`);

function toggleFilter(event) {
  let clickedFilter = event.target.closest(`.filter__input`);
  if (clickedFilter) {
    boardTasks.innerHTML = ``;

    const randomAmount = Math.floor(Math.random() * 6) + 1;
    renderCards(randomAmount);
  }
}

function renderFilters() {
  let result = ``;
  result += renderFilter(`overdue`, 0);
  result += renderFilter(`today`, 0);
  result += renderFilter(`favorites`, 7);
  result += renderFilter(`repeating`, 2);
  result += renderFilter(`tags`, 6);
  result += renderFilter(`archive`, 115);
  mainFilter.innerHTML = result;
}

mainFilter.addEventListener(`click`, toggleFilter);

// Temp render
renderCards(7);
renderFilters();
