import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import {
  generateRandomNumbers,
  randomNumbersArr,
} from "./helper/generateRandomNumbers";
import { shuffle } from "./helper/shuffleArray";
import Score from "./components/Score";

const clickedCards = [];

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchAPI = () => {
      randomNumbersArr.forEach(async (number) => {
        const fetchRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${number}/`
        );
        if (fetchRequest.ok) {
          const data = await fetchRequest.json();
          setCards((oldArray) => [...oldArray, data]);
        } else console.error("There was an error ");
      });
    };

    return () => {
      fetchAPI();
    };
  }, []);

  function handleClick(e) {
    if (clickedCards.includes(e.target.id)) {
      setScore(0);
    } else {
      setScore((score) => score + 1);
      clickedCards.push(e.target.id);
      shuffle(cards);
    }
  }

  generateRandomNumbers(5);
  return (
    <>
      <Score score={score} length={cards.length}></Score>
      <section className="cards-section">
        {cards.length !== 5 ? (
          <p>Loading</p>
        ) : (
          <Cards data={cards} onClick={handleClick} />
        )}
      </section>
      {score === cards.length ? (
        <dialog open className="dialog">
          <p>You Have Won!</p>
        </dialog>
      ) : null}
      {clickedCards.length !== 0 && score === 0 ? (
        <dialog open className="dialog">
          <p>You Lost!</p>
        </dialog>
      ) : null}
    </>
  );
}
