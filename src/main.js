import {makeTaskData} from './make-task.js';
import {renderFilter} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const boardTasks = document.querySelector(`.board__tasks`);
let tasks = [];

const deleteTask = (tasks, i) => {
  tasks[i] = null;
  return tasks;
};

function renderTasks(amount) {
  for (let i = 0; i < amount; i++) {
    let taskData = makeTaskData();
    tasks.push(taskData);

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
      deleteTask(tasks, i);
      // task.unrender(); Должны ли мы делать анрендер для task? Ведь он и так пропадает из DOM почему-то, хотя мы делаем анрендер только taskEdit
      taskEdit.unrender();
    }

  }
}

const mainFilter = document.querySelector(`.main__filter`);

function toggleFilter(event) {
  let clickedFilter = event.target.closest(`.filter__input`);
  if (clickedFilter) {
    tasks = [];
    boardTasks.innerHTML = ``;

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
