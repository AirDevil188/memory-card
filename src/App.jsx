import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import {
  generateRandomNumbers,
  randomNumbersArr,
} from "./helper/generateRandomNumbers";
import { shuffle } from "./helper/shuffleArray";
import Score from "./components/Score";
import StartingScreen from "./components/StartingScreen";
import EndScreen from "./components/EndScreen";

const clickedCards = [];

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(false);
  const [clickEnabled, setClick] = useState(true);

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

  useEffect(() => {
    return (score === cards.length && cards.length !== 0) ||
      (clickedCards.length !== 0 && score === 0)
      ? setClick(false)
      : setClick(true);
  }, [score, cards.length]);

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

      <section className="cards-section">
        {<Cards data={cards} onClick={clickEnabled ? handleScore : null} />}
      </section>

      {!clickEnabled && score === cards.length ? (
        <EndScreen text="You Win!"></EndScreen>
      ) : null}
      {!clickEnabled && score === 0 && clickedCards.length !== 0 ? (
        <EndScreen text="You Lose!"></EndScreen>
      ) : null}
    </>
  );
}
