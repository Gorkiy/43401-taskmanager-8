/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _make_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./make-task.js */ "./src/make-task.js");
/* harmony import */ var _make_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-filter.js */ "./src/make-filter.js");



const boardTasks = document.querySelector(`.board__tasks`);

function renderCards(amount) {
  for (let i = 0; i < amount; i++) {
    let card = new _make_task_js__WEBPACK_IMPORTED_MODULE_0__["Card"](`This is a random generated card`, [`repeat`, `cinema`, `entertaiment`], `pink`, i);
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

function renderFilters() {
  let result = ``;
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`overdue`, 0);
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`today`, 0);
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`favorites`, 7);
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`repeating`, 2);
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`tags`, 6);
  result += Object(_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["renderFilter"])(`archive`, 115);
  mainFilter.innerHTML = result;
}

mainFilter.addEventListener(`click`, toggleFilter);

// Temp render
renderCards(7);
renderFilters();


/***/ }),

/***/ "./src/make-filter.js":
/*!****************************!*\
  !*** ./src/make-filter.js ***!
  \****************************/
/*! exports provided: renderFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderFilter", function() { return renderFilter; });
function renderFilter(filterName, count = 0, isChecked = false) {
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


/***/ }),

/***/ "./src/make-task.js":
/*!**************************!*\
  !*** ./src/make-task.js ***!
  \**************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

class Card {
  constructor(text, hashtags, color = `black`, id) {
    this.text = text;
    this.hashtags = hashtags;
    this.color = color;
    this.render = ``;
    this.id = id;
  }

  renderCard(board) {
    const card = this;
    this.render = `
      <article class="card card--${this.color}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this.text}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">no</span>
                  </button>

                  <fieldset class="card__date-deadline" disabled="">
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="23 September" name="date">
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="11:15 PM" name="time">
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">no</span>
                  </button>

                  <fieldset class="card__repeat-days" disabled="">
                    <div class="card__repeat-days-inner">
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-3" name="repeat" value="mo">
                      <label class="card__repeat-day" for="repeat-mo-3">mo</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-3" name="repeat" value="tu" checked="">
                      <label class="card__repeat-day" for="repeat-tu-3">tu</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-3" name="repeat" value="we">
                      <label class="card__repeat-day" for="repeat-we-3">we</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-3" name="repeat" value="th">
                      <label class="card__repeat-day" for="repeat-th-3">th</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-3" name="repeat" value="fr" checked="">
                      <label class="card__repeat-day" for="repeat-fr-3">fr</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-3">
                      <label class="card__repeat-day" for="repeat-sa-3">sa</label>
                      <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-3" name="repeat" value="su" checked="">
                      <label class="card__repeat-day" for="repeat-su-3">su</label>
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                    ${ this.hashtags.map(function (hashtag) {
    return `<span class="card__hashtag-inner">
                        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                        <button type="button" class="card__hashtag-name">
                          #${hashtag}
                        </button>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`;
  }).join(``)
}
                  </div>

                  <label>
                    <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                  </label>
                </div>
              </div>

              <label class="card__img-wrap card__img-wrap--empty">
                <input type="file" class="card__img-input visually-hidden" name="img">
                <img src="img/add-photo.svg" alt="task picture" class="card__img">
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${ colors.map(function (color) {
    return `<input type="radio" id="color-${color}-${card.id}" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}">
                    <label for="color-${color}-${card.id}" class="card__color card__color--${color}">${color}</label>`;
  }).join(``)
}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
    board.insertAdjacentHTML(`beforeend`, this.render);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map