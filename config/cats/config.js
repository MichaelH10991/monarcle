module.exports = {
  appName: "cats",
  prompt: "What cat?",
  iconAlt: "The icon",
  placeholderText: "Cat",
  maxGuesses: 5,
  logic: (guess, ans) => {
    return guess === ans;
  },
  indicatorValue: (guess, ans) => {
    return guess.name === ans.name;
  },
  theme: {
    background: "brown",
    secondary: "green",
    text: "white",
    borderColor: "green",
  },
  data: [
    {
      name: "Maine Coon",
      gender: "m",
      src: "maine_coon.jpeg",
    },
  ],
};
