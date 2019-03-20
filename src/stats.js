import Chart from 'chart.js';
import flatpickr from 'flatpickr';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {chartColorsData} from './main.js';
// import './main.js';

const date = document.querySelector(`.statistic__period-input`);
const tagsCtx = document.querySelector(`.statistic__tags`);
const colorsCtx = document.querySelector(`.statistic__colors`);

export const defaultDates = {
  thisMonday: null,
  thisSunday: null
};

const getDefaultDateRange = () => {
  let fromDate = new Date();
  let dueDate = new Date();
  const daysOverMonday = fromDate.getDay() - 1;
  const daysBeforeSunday = 7 - fromDate.getDay();

  fromDate.setDate(fromDate.getDate() - daysOverMonday);
  dueDate.setDate(dueDate.getDate() + daysBeforeSunday);

  defaultDates.thisMonday = fromDate;
  defaultDates.thisSunday = dueDate;
};

getDefaultDateRange();

export const statsPeriod = flatpickr(date, {
  mode: `range`,
  dateFormat: `d-m-Y`,
  defaultDate: [defaultDates.thisMonday, defaultDates.thisSunday],
});

export const tagsChart = new Chart(tagsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
    datasets: [{
      data: [20, 15, 10, 5, 2],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: TAGS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});

// В разрезе цветов
export const colorsChart = new Chart(colorsCtx, {
  plugins: [ChartDataLabels],
  type: `pie`,
  data: {
    labels: chartColorsData.keys(),
    datasets: [{
      data: [5, 25, 15, 10, 30],
      backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index];
          const total = allData.reduce((acc, it) => acc + parseFloat(it));
          const tooltipPercentage = Math.round((tooltipData / total) * 100);
          return `${tooltipData} TASKS — ${tooltipPercentage}%`;
        }
      },
      displayColors: false,
      backgroundColor: `#ffffff`,
      bodyFontColor: `#000000`,
      borderColor: `#000000`,
      borderWidth: 1,
      cornerRadius: 0,
      xPadding: 15,
      yPadding: 15
    },
    title: {
      display: true,
      text: `DONE BY: COLORS`,
      fontSize: 16,
      fontColor: `#000000`
    },
    legend: {
      position: `left`,
      labels: {
        boxWidth: 15,
        padding: 25,
        fontStyle: 500,
        fontColor: `#000000`,
        fontSize: 13
      }
    }
  }
});