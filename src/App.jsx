import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import {
  generateRandomNumbers,
  randomNumbersArr,
} from "./helper/generateRandomNumbers";
import { shuffle } from "./helper/shuffleArray";
import Score from "./components/Score";
import StartingScreen from "./components/StartingScreen";

const clickedCards = [];

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(false);

  useEffect(() => {
    const fetchAPI = () => {
      randomNumbersArr.forEach(async (number) => {
        const fetchRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${number}/`
        );
        if (fetchRequest.ok) {
          const data = await fetchRequest.json();
          setCards((oldArray) => [...oldArray, data]);
          console.log(data);
        } else console.error("There was an error with fetching");
      });
    };

    return () => {
      fetchAPI();
    };
  }, [difficulty]);

  function handleScore(e) {
    if (clickedCards.includes(e.target.id)) {
      setScore(0);
    } else {
      setScore((score) => score + 1);
      clickedCards.push(e.target.id);
      shuffle(cards);
    }
  }

  function handleDifficulty(e) {
    switch (e.target.textContent) {
      case "Easy":
        generateRandomNumbers(5);
        setDifficulty(true);
        break;
      case "Medium":
        generateRandomNumbers(10);
        setDifficulty(true);
        break;
      case "Hard":
        generateRandomNumbers(15);
        setDifficulty(true);
        break;
    }
  }

  return (
    <>
      {difficulty ? (
        <Score score={score} length={cards.length}></Score>
      ) : (
        <StartingScreen handleClick={handleDifficulty}></StartingScreen>
      )}
      {}

      <section className="cards-section">
        {<Cards data={cards} onClick={handleScore} />}
      </section>
      {score === cards.length && clickedCards.length !== 0 ? (
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
