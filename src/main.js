import {makeTaskData} from './make-task.js';
import {makeFilterData} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';
import './stats.js';
import {chart, statsPeriod, colorToHex} from './stats.js';

const boardTasks = document.querySelector(`.board__tasks`);
const mainFilter = document.querySelector(`.main__filter`);
const statistic = document.querySelector(`.statistic`);
const statsButton = document.querySelector(`#control__statistic`);
const tasksButton = document.querySelector(`#control__task`);

let tasksRawData = [];
const chartData = {
  colors: [],
  colorRepeats: [],
  hexColors: [],
  tags: [],
  tagRepeats: [],
};

statsButton.addEventListener(`click`, () => {
  boardTasks.classList.add(`visually-hidden`);
  statistic.classList.remove(`visually-hidden`);
  renderCharts();

  statsPeriod.config.onChange = renderCharts; // Как заставить onChange делать ререндер чартов на смену дат?
  console.log(chartData);
});

tasksButton.addEventListener(`click`, () => {
  boardTasks.classList.remove(`visually-hidden`);
  statistic.classList.add(`visually-hidden`);
});

const getChartsData = (tasks) => {
  const filteredTasks = tasks.filter((task) => {
    return task.dueDate < statsPeriod.selectedDates[1] && task.dueDate > statsPeriod.selectedDates[0];
  });

  const chartColors = new Map();
  const chartTags = new Map();
  const hexColors = [];
  filteredTasks.map((task) => {
    if (!chartColors.has(task.color)) {
      chartColors.set(task.color, 1);
      hexColors.push(colorToHex(task.color));
    } else {
      chartColors.set(task.color, chartColors.get(task.color) + 1);
    }
  });

  filteredTasks.map((task) => {
    Array.from(task.tags).map((tag) => {
      if (!chartTags.has(tag)) {
        chartTags.set(tag, 1);
        // hexColors.push(colorToHex(task.color));
      } else {
        chartTags.set(tag, chartTags.get(tag) + 1);
      }
    });
  });

  chartData.colors = [...chartColors.keys()];
  chartData.colorRepeats = [...chartColors.values()];
  chartData.hexColors = hexColors;

  chartData.tags = [...chartTags.keys()];
  chartData.tagRepeats = [...chartTags.values()];
};

const renderCharts = () => {
  getChartsData(tasksRawData);
  chart.generateColorsChart(document.querySelector(`.statistic__colors`), chartData.colors, chartData.colorRepeats, chartData.hexColors);
  chart.generateTagsChart(document.querySelector(`.statistic__tags`), chartData.tags, chartData.tagRepeats);
}

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

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasksRawData;

    case `filter__overdue`:
      return tasksRawData.filter((it) => it.dueDate < Date.now());

    case `filter__today`:
      return tasksRawData.filter(() => true);

    case `filter__repeating`:
      return tasksRawData.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
  }
  return tasksRawData;
};

function renderFilters(filtersData) {
  filtersData.forEach((rawFilter) => {
    let filter = new Filter(rawFilter);
    mainFilter.appendChild(filter.render());

    filter.onFilter = () => {
      const filterName = filter._id;
      const filteredTasks = filterTasks(tasksRawData, filterName);
      boardTasks.innerHTML = ``; // там можно очищать или надо думать, как удалять элементы?
      renderTasks(filteredTasks);
    };
  });
}

// Temp render
tasksRawData = getRawData(7);
renderTasks(tasksRawData);
renderFilters(filtersRawData);
getChartsData(tasksRawData);
