
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

export const makeTaskData = () =>
  ({
    title: titles[getRandomInt(titles.length)],
    dueDate: Date.now() + MS_IN_DAY * getRandomInt(2),
    tags: new Set(getRandomTags(tags)),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: colors[getRandomInt(colors.length)],
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': false,
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    isFavorite: true,
    isDone: false,
  });
