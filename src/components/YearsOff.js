import { useEffect, useState } from "react";

const YEAR = 2024;
const SPEED = 100;

const useNumber = () => {
  const [number, setNumber] = useState();
  return [number, setNumber];
};

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function load(yearsOff, setNumber) {
  for (var i = YEAR; i >= yearsOff; i -= SPEED) {
    setNumber(i);
    await wait(50);
  }
  setNumber(yearsOff);
}

const YearsOff = ({ from, to, setLoading, index, isCorrect }) => {
  const [number, setNumber] = useState();

  const yearsOff = Math.abs(from - to);

  useEffect(() => {
    async function doThing() {
      await load(yearsOff, setNumber);
      setLoading((loadingStates) => ({
        ...loadingStates,
        [index]: isCorrect ? "correct" : "incorrect",
      }));
    }
    doThing();
  }, [index, yearsOff, setLoading, isCorrect]);

  return `${number} yrs`;
};

export default YearsOff;
