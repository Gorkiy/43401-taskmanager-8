import {renderTask, task} from './make-task.js';
import {renderFilter} from './make-filter.js';

const boardTasks = document.querySelector(`.board__tasks`);
let tasks = [];

function renderTasks(amount) {
  for (let i = 0; i < amount; i++) {
    tasks.push(renderTask(task));
  }
  boardTasks.innerHTML = tasks.join(``);
}

const mainFilter = document.querySelector(`.main__filter`);

function toggleFilter(event) {
  let clickedFilter = event.target.closest(`.filter__input`);
  if (clickedFilter) {
    tasks = [];

    const randomAmount = Math.floor(Math.random() * 6) + 1;
    renderTasks(randomAmount);
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
renderTasks(7);
renderFilters();
