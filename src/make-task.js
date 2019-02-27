
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];
const getRandomInt = (maxNum) => Math.floor(Math.random() * maxNum);

const getRandomTags = (tagsArr) => {
  let result = [];
  for (let i = 0; i < getRandomInt(4); i++) {
    let tag = tagsArr[getRandomInt(tags.length)];
    if (!result.includes(tag)) {
      result.push(tag);
    } else {
      i--;
    }
  }
  return result;
};

export const task = () =>
  ({
    title: titles[getRandomInt(titles.length)],
    dueDate: Date.now() + MS_IN_DAY * getRandomInt(7),
    tags: new Set(getRandomTags(tags)),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: colors[getRandomInt(colors.length)],
    repeatingDays: {
      'mo': true,
      'tu': false,
      'we': true,
      'th': false,
      'fr': false,
      'sa': true,
      'su': false,
    },
    isFavorite: true,
    isDone: false,
  });

export const renderTask = (curTask) => `<article class="card card--${curTask.color}">
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
          <textarea class="card__text" placeholder="Start typing your text here..." name="text">${curTask.title}</textarea>
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
                ${ Object.keys(curTask.repeatingDays).map((day) =>`<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-3" name="repeat" value="${day}" checked="">
                <label class="card__repeat-day" for="repeat-${day}-3">${day}</label>`).join(``)}
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${ [...curTask.tags].map((hashtag) =>`<span class="card__hashtag-inner">
                  <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                  <button type="button" class="card__hashtag-name">
                    #${hashtag}
                  </button>
                  <button type="button" class="card__hashtag-delete">
                    delete
                  </button>
                </span>`).join(``)
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
            ${ colors.map((color) =>`<input type="radio" id="color-${color}-5" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}">
              <label for="color-${color}-5" class="card__color card__color--${color}">${color}</label>`).join(``)
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
