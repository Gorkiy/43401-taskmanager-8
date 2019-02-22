import {Card} from './make-task.js';
import {renderFilter} from './make-filter.js';

const boardTasks = document.querySelector(`.board__tasks`);

function renderCards(amount) {
  for (let i = 0; i < amount; i++) {
    let card = new Card(`This is a random generated card`, [`repeat`, `cinema`, `entertaiment`], `pink`, i);
    card.renderCard(boardTasks);
  }
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

mainFilter.addEventListener(`click`, toggleFilter);

// Temp render
renderCards(7);

mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`overdue`, 0));
mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`today`, 0));
mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`favorites`, 7));
mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`repeating`, 2));
mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`tags`, 6));
mainFilter.insertAdjacentHTML(`beforeend`, renderFilter(`archive`, 115));
