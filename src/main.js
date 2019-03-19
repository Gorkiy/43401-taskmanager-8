import {makeTaskData} from './make-task.js';
import {makeFilterData} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';

const boardTasks = document.querySelector(`.board__tasks`);
// const filters = document.querySelector(`.filter`);
const mainFilter = document.querySelector(`.main__filter`);
let tasksRawData = [];
let filtersRawData = [
  makeFilterData(`all`, `filter__all`, true),
  makeFilterData(`overdue`, `filter__overdue`),
  makeFilterData(`today`, `filter__today`),
  makeFilterData(`favorites`, `filter__favorites`),
  makeFilterData(`repeating`, `filter__repeating`),
  makeFilterData(`tags`, `filter__tags`),
  makeFilterData(`archive`, `filter__archive`)
];

const deleteTask = (tasks, i) => {
  tasks[i] = null;
  return tasks;
};

const getRawData = (amount) => {
  let result = [];
  for (let i = 0; i < amount; i++) {
    let taskData = makeTaskData();
    result.push(taskData);
  }
  return result;
};

function renderTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    // let taskData = makeTaskData();
    // tasks.push(taskData);
    let taskData = tasksRawData[i];

    let task = new Task(taskData);
    let taskEdit = new TaskEdit(taskData);

    boardTasks.appendChild(task.render());

    task.onEdit = () => {
      taskEdit.render();
      boardTasks.replaceChild(taskEdit.element, task.element);
      task.unrender();
    };

    taskEdit.onSubmit = (newObject) => {
      taskData.title = newObject.title;
      taskData.tags = newObject.tags;
      taskData.color = newObject.color;
      taskData.repeatingDays = newObject.repeatingDays;
      taskData.dueDate = newObject.dueDate;

      task.update(taskData);
      task.render();
      boardTasks.replaceChild(task.element, taskEdit.element);
      taskEdit.unrender();
    };

    taskEdit.onDelete = () => {
      deleteTask(tasks, i); // Вопрос 1. Спросить у Вадима, почему здесь при возвращении tasks обновляется массив в глобальной видимости. Или не обновляется? Не понимаю, как это работает
      taskEdit.unrender();
      // task.unrender(); Вопрос 2. Должны ли мы делать анрендер для task? Ведь он и так пропадает из DOM почему-то, хотя мы делаем анрендер только taskEdit
    };
  }
}

function toggleFilter(event) {
  let clickedFilter = event.target.closest(`.filter__input`);
  if (clickedFilter) {
    boardTasks.innerHTML = ``;
    const randomAmount = Math.floor(Math.random() * 6) + 1;
    tasksRawData = getRawData(randomAmount);
    renderTasks(tasksRawData);
  }
}

function renderFilters(filtersData) {
  filtersData.forEach((rawFilter) => {
    const filter = new Filter(rawFilter);
    mainFilter.appendChild(filter.render());
    // console.log(mainFilter);
  });
  // mainFilter.innerHTML = result;
}

// mainFilter.onchange = (evt) => {
//   const filterName = evt.target.id;
//   const filteredTasks = filterTasks(tasksRawData, filterName);
//   renderTasks(filteredTasks);
// };

mainFilter.addEventListener(`click`, toggleFilter);

// Temp render
tasksRawData = getRawData(7);
renderTasks(tasksRawData);
renderFilters(filtersRawData);
