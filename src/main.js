import {makeFilterData} from './make-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';
import './stats.js';
import {chart, statsPeriod, colorToHex} from './stats.js';
import API from './api.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/task-manager/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const boardTasks = document.querySelector(`.board__tasks`);
const mainFilter = document.querySelector(`.main__filter`);
const statistic = document.querySelector(`.statistic`);
const statsButton = document.querySelector(`#control__statistic`);
const tasksButton = document.querySelector(`#control__task`);

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
  statsPeriod.config.onChange = [renderCharts];
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
  if (chart.colorChart !== null) {
    chart.colorChart.destroy();
  }
  if (chart.tagsChart !== null) {
    chart.tagsChart.destroy();
  }

  api.getTasks()
    .then((tasks) => {
      getChartsData(tasks);
      chart.generateColorsChart(document.querySelector(`.statistic__colors`), chartData.colors, chartData.colorRepeats, chartData.hexColors);
      chart.generateTagsChart(document.querySelector(`.statistic__tags`), chartData.tags, chartData.tagRepeats);
    });
};

let filtersRawData = [
  makeFilterData(`all`, `filter__all`, true),
  makeFilterData(`overdue`, `filter__overdue`),
  makeFilterData(`today`, `filter__today`),
  makeFilterData(`favorites`, `filter__favorites`),
  makeFilterData(`repeating`, `filter__repeating`),
  makeFilterData(`tags`, `filter__tags`),
  makeFilterData(`archive`, `filter__archive`)
];

function renderTasks(tasks) {
  for (const taskData of tasks) {
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

      const block = () => {
        taskEdit.element.querySelector(`.card__save`).innerText = `saving...`;
        taskEdit.element.querySelector(`.card__inner`).classList.remove(`card__error`);
        taskEdit.element.querySelector(`.card__save`).disabled = true;
        taskEdit.element.querySelector(`.card__text`).disabled = true;
      };
      const unblock = () => {
        taskEdit.element.querySelector(`.card__save`).innerText = `save`;
        taskEdit.element.querySelector(`.card__save`).disabled = false;
        taskEdit.element.querySelector(`.card__text`).disabled = false;
      };

      block();

      api.updateTask({id: taskData.id, data: taskData.toRAW()})
        .then((newTask) => {
          unblock();
          task.update(newTask);
          task.render();
          boardTasks.replaceChild(task.element, taskEdit.element);
          taskEdit.unrender();
        })
        .catch(() => {
          taskEdit.shake();
          taskEdit.element.querySelector(`.card__inner`).classList.add(`card__error`);
          unblock();
        });
    };

    taskEdit.onDelete = ({id}) => {
      const block = () => {
        taskEdit.element.querySelector(`.card__delete`).innerText = `deleting...`;
        taskEdit.element.querySelector(`.card__inner`).classList.remove(`card__error`);
        taskEdit.element.querySelector(`.card__delete`).disabled = true;
        taskEdit.element.querySelector(`.card__text`).disabled = true;
      };
      const unblock = () => {
        taskEdit.element.querySelector(`.card__delete`).innerText = `delete`;
        taskEdit.element.querySelector(`.card__delete`).disabled = false;
        taskEdit.element.querySelector(`.card__text`).disabled = false;
      };

      block();

      api.deleteTask({id})
        .then(() => api.getTasks())
        .then((remainTasks) => {
          taskEdit.unrender();
          boardTasks.innerHTML = ``;
          renderTasks(remainTasks);
        })
        .catch(() => {
          taskEdit.shake();
          taskEdit.element.querySelector(`.card__inner`).classList.add(`card__error`);
          unblock();
        });
    };
  }
}

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasks;
    case `filter__overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());
    case `filter__today`:
      return tasks.filter(() => true);
    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
  }
  return tasks;
};

function renderFilters(filtersData) {
  filtersData.forEach((rawFilter) => {
    let filter = new Filter(rawFilter);
    mainFilter.appendChild(filter.render());

    filter.onFilter = () => {
      const filterName = filter._id;
      api.getTasks()
        .then((tasks) => {
          const filteredTasks = filterTasks(tasks, filterName);
          boardTasks.innerHTML = ``;
          renderTasks(filteredTasks);
        });
    };
  });
}

// Render
api.getTasks()
  .then((tasks) => {
    renderTasks(tasks);
  });

renderFilters(filtersRawData);
