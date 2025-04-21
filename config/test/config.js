const { borderColor } = require("@mui/system");

module.exports = {
  appName: "Test App",
  prompt: "Who is this?",
  iconAlt: "The icon",
  placeholderText: "Who is this?",
  maxGuesses: 10,
  logic: (guess, ans) => {
    return guess === ans;
  },
  indicatorValue: (guess, ans) => {
    return Math.abs(guess.age - ans.age);
  },
  theme: {
    background: "red",
    secondary: "blue",
    text: "white",
    borderColor: "#383838",
  },
  data: [
    {
      name: "Michael",
      gender: "m",
      src: "about.jpeg",
      age: 28,
    },
    {
      name: "Michael 1",
      gender: "m",
      src: "icon.webp",
      age: 29,
    },
  ],
};
