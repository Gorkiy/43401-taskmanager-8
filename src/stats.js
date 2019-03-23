import Chart from 'chart.js';
import flatpickr from 'flatpickr';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const date = document.querySelector(`.statistic__period-input`);
// const tagsCtx = document.querySelector(`.statistic__tags`);
// const colorsCtx = document.querySelector(`.statistic__colors`);

export const getDefaultDateRange = () => {
  let fromDate = new Date();
  let dueDate = new Date();
  const daysOverMonday = fromDate.getDay() - 1;
  const daysBeforeSunday = 7 - fromDate.getDay();

  fromDate.setDate(fromDate.getDate() - daysOverMonday);
  dueDate.setDate(dueDate.getDate() + daysBeforeSunday);
  return [fromDate, dueDate];
};

export const colorToHex = (color) => {
  let result = ``;
  switch (color) {
    case `pink`:
      result = `#ff3cb9`;
      break;
    case `yellow`:
      result = `#ffe125`;
      break;
    case `blue`:
      result = `#0c5cdd`;
      break;
    case `black`:
      result = `#000000`;
      break;
    case `green`:
      result = `#31b55c`;
      break;
    // default: console.log(`something went wrong`);
  }
  return result;
};

// TODO: Написать логику onChange, чтобы сохранять измененнные даты и тут же их применять к чарту в main?
export const statsPeriod = flatpickr(date, {
  mode: `range`,
  dateFormat: `d-m-Y`,
  defaultDate: [getDefaultDateRange()[0], getDefaultDateRange()[1]],
});

// export const

// В разрезе цветов

export const chart = {
  colorChart: null,
  tagsChart: null,

  generateColorsChart(container, colorLabels, colorRepeats, hexColors) {
    this.colorChart = new Chart(container, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: colorLabels,
        datasets: [{
          data: colorRepeats,
          backgroundColor: hexColors
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
    return this.colorChart;
  },

  generateTagsChart(container, tags, tagRepeats) {
    this.tagsChart = new Chart(container, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: tags,
        datasets: [{
          data: tagRepeats,
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
    return this.tagsChart;
  }

};

// export const colorsChart = new Chart(colorsCtx, {
//   plugins: [ChartDataLabels],
//   type: `pie`,
//   data: {
//     labels: renderColorsChart(colorsData).colorLabels,
//     datasets: [{
//       data: [5, 25, 15, 10, 30],
//       backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
//     }]
//   },
//   options: {
//     plugins: {
//       datalabels: {
//         display: false
//       }
//     },
//     tooltips: {
//       callbacks: {
//         label: (tooltipItem, data) => {
//           const allData = data.datasets[tooltipItem.datasetIndex].data;
//           const tooltipData = allData[tooltipItem.index];
//           const total = allData.reduce((acc, it) => acc + parseFloat(it));
//           const tooltipPercentage = Math.round((tooltipData / total) * 100);
//           return `${tooltipData} TASKS — ${tooltipPercentage}%`;
//         }
//       },
//       displayColors: false,
//       backgroundColor: `#ffffff`,
//       bodyFontColor: `#000000`,
//       borderColor: `#000000`,
//       borderWidth: 1,
//       cornerRadius: 0,
//       xPadding: 15,
//       yPadding: 15
//     },
//     title: {
//       display: true,
//       text: `DONE BY: COLORS`,
//       fontSize: 16,
//       fontColor: `#000000`
//     },
//     legend: {
//       position: `left`,
//       labels: {
//         boxWidth: 15,
//         padding: 25,
//         fontStyle: 500,
//         fontColor: `#000000`,
//         fontSize: 13
//       }
//     }
//   }
// });
