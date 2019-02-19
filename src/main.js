'use strict';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

class Card {
  constructor(text, hashtags, color) {
    this.text = text;
    this.hashtags = hashtags;
    this.color = color;
    this.render = ``;
  }
}

function renderFilter(filterName, count = 0, isChecked = false) {
  let filterState = isChecked ? `checked` : ``;
  if (count === 0) {
    filterState = `disabled`;
  }

  const filter = `
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

  mainFilter.insertAdjacentHTML(`beforeend`, filter);
}

function renderCard(text, hashtags, color = `black`) {
  let card = new Card(text, hashtags, color);

  card.render = `
    <article class="card card--${card.color}">
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
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${card.text}</textarea>
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
                  ${ card.hashtags.map(function (hashtag) {
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
                <input type="radio" id="color-black-3" class="card__color-input card__color-input--black visually-hidden" name="color" value="black">
                <label for="color-black-3" class="card__color card__color--black">black</label>
                <input type="radio" id="color-yellow-3" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow">
                <label for="color-yellow-3" class="card__color card__color--yellow">yellow</label>
                <input type="radio" id="color-blue-3" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue">
                <label for="color-blue-3" class="card__color card__color--blue">blue</label>
                <input type="radio" id="color-green-3" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" checked="">
                <label for="color-green-3" class="card__color card__color--green">green</label>
                <input type="radio" id="color-pink-3" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink">
                <label for="color-pink-3" class="card__color card__color--pink">pink</label>
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
  boardTasks.insertAdjacentHTML(`beforeend`, card.render);
}

function toggleFilter(event) {
  let clickedFilter = event.target.closest(`.filter__input`);
  if (clickedFilter) {
    boardTasks.innerHTML = ``;

    const randomAmount = Math.floor(Math.random() * 6) + 1;
    renderCards(randomAmount);
  }
}

function renderCards(amount) {
  for (let i = 0; i < amount; i++) {
    renderCard(`This is a random generated card`, [`repeat`, `cinema`, `entertaiment`], `pink`);
  }
}

// Temp render
renderFilter(`all`, 15, true);
renderFilter(`overdue`, 0);
renderFilter(`today`, 0);
renderFilter(`favorites`, 7);
renderFilter(`repeating`, 2);
renderFilter(`tags`, 6);
renderFilter(`archive`, 115);

renderCards(7);

mainFilter.addEventListener(`click`, toggleFilter);
