import { useEffect, useState } from "react";
import Cards from "./components/Cards";

const clickedCards = [];
const randomNumbersArr = new Set([]);

export default function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);

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

  function handleClick(e) {
    if (clickedCards.includes(e.target.id)) {
      setCount(0);
    } else {
      setCount((count) => count + 1);
      clickedCards.push(e.target.id);
    }
  }

  generateRandomNumbers(5);

  return (
    <>
      <section className="cards-section">
        <Cards data={cards} onClick={handleClick} />
      </section>
      <p>{count}</p>
    </>
  );
}
