import { DateTime } from "luxon";

const randomNumber = (high, low) =>
  Math.floor(Math.random() * (high - low) + low);

const getElementCyclic = (data) => {
  const index = DateTime.now().ordinal % data.length;
  return data[index];
};

const getMonarch = (monarchs) => {
  return getElementCyclic(monarchs);
};

const getRandomMonarch = (monarchs) => {
  return monarchs[randomNumber(monarchs.length, 0)];
};

const findMonarch = (monarchs, name) => {
  return monarchs.find(
    (monarch) => monarch.name.toLowerCase() === name.toLowerCase()
  );
};

const getHint = (monarch, guessCount) =>
  monarch.hints && monarch.hints[guessCount];

export { getMonarch, findMonarch, randomNumber, getHint, getRandomMonarch };
