import { DateTime } from "luxon";

const getElementCyclic = (data) => {
  const index = DateTime.now().ordinal % data.length;
  return data[index];
};

const getMonarch = (monarchs) => {
  return getElementCyclic(monarchs);
};

const findMonarch = (monarchs, name) => {
  return monarchs.find(
    (monarch) => monarch.name.toLowerCase() === name.toLowerCase()
  );
};

const randomNumber = (high, low) => Math.random() * (high - low) + low;

const getHint = (monarch, guessCount) =>
  monarch.hints && monarch.hints[guessCount];

export { getMonarch, findMonarch, randomNumber, getHint };
