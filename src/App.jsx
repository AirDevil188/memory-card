import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import {
  generateRandomNumbers,
  randomNumbersArr,
} from "./helper/generateRandomNumbers";
import { shuffle } from "./helper/shuffleArray";

const clickedCards = [];

export default function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchAPI = () => {
      randomNumbersArr.forEach(async (number) => {
        const fetchRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${number}/`
        );
        const data = await fetchRequest.json();
        setCards((oldArray) => [...oldArray, data]);
      });
    };

    return () => {
      fetchAPI();
    };
  }, []);

  function handleClick(e) {
    if (clickedCards.includes(e.target.id)) {
      setCount(0);
    } else {
      setCount((count) => count + 1);
      clickedCards.push(e.target.id);
      shuffle(cards);
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
