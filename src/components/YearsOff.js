import { useEffect, useState } from "react";

const YEAR = 2024;
const SPEED = 100;

const useNumber = () => {
  const [number, setNumber] = useState();
  return [number, setNumber];
};

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function load(yearsOff, setNumber, setLoading, index) {
  for (var i = YEAR; i >= yearsOff; i -= SPEED) {
    setNumber(i);
    await wait(50);
  }
  setNumber(yearsOff);
  setLoading((loadingStates) => ({ ...loadingStates, [index]: false }));
}

const YearsOff = ({ from, to, setLoading, index }) => {
  const [number, setNumber] = useState();

  const yearsOff = Math.abs(from - to);

  useEffect(() => {
    async function doThing() {
      await load(yearsOff, setNumber, setLoading, index);
    }
    doThing();
  }, [index, yearsOff, setLoading]);

  return `${number} yrs`;
};

export default YearsOff;
