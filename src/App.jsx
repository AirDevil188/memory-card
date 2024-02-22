import { useEffect } from "react";

const randomNumbersArr = new Set([]);

export default function App() {
  useEffect(() => {
    const key = () => {
      console.log(randomNumbersArr, "arr");
      randomNumbersArr.forEach(async (number) => {
        const fetchRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${number}/`
        );
        const data = await fetchRequest.json();
        setCards((oldArray) => [...oldArray, data]);
      });
    };

    return () => {
      key();
    };
  }, []);

  const generateRandomNumbers = (length) => {
    const randomNumber = Math.floor(Math.random() * 150 + 1);
    while (randomNumbersArr.size !== length) {
      if (!randomNumbersArr.has(randomNumber))
        randomNumbersArr.add(randomNumber);
      else return generateRandomNumbers(length);
    }
  };

  generateRandomNumbers(5);
}
