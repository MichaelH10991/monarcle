module.exports = {
  appName: "Art",
  prompt: "Who created this?",
  iconAlt: "The icon",
  placeholderText: "Artist",
  variant: "bool",
  maxGuesses: 5,
  theme: {
    background: "#0c3d02",
    secondary: "#5b6e49",
    text: "white",
    borderColor: "green",
  },
  data: [
    {
      name: "Van Gogh",
      gender: "m",
      src: "van_gogh.jpg",
    },
    {
      name: "Edvard Munch",
      src: "the_scream.jpg",
    },
    {
      name: "Van Gogh",
      src: "starry_night.jpg",
    },
  ],
};
