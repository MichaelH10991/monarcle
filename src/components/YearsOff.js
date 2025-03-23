import { useEffect, useState } from "react";

const YEAR = 2024;

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function load(yearsOff, setNumber, setLoading, index) {
  for (var i = YEAR; i >= yearsOff; i -= 100) {
    setNumber(i);
    await wait(50);
  }
  setNumber(yearsOff);
  setLoading((loadingStates) => ({ ...loadingStates, [index]: false }));
}

const YearsOff = ({ guess, answer, setLoading, index }) => {
  const [number, setNumber] = useState();
  // const [loading, setLoading]
  const yearsOff = Math.abs(guess - answer);

  useEffect(() => {
    async function doThing() {
      await load(yearsOff, setNumber, setLoading, index);
    }
    doThing();
  }, [yearsOff]);

  return `+/-${number} yrs`;
};

export default YearsOff;
