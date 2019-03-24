const getRandomInt = (maxNum) => Math.floor(Math.random() * maxNum);

export const makeFilterData = (title, id, isChecked = false) =>
  ({
    title,
    id,
    count: getRandomInt(7),
    isChecked
  });
