const fs = require("fs");
const path = require("path");
const data = require("../src/data.json");

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), filePath), data);
  } catch (error) {
    console.log(error);
  }
};

const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const shuffled = shuffle(data);
writeFile("src/data.json", JSON.stringify(shuffled));
