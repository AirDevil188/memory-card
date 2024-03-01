import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import {
  generateRandomNumbers,
  randomNumbersArr,
  setRandomNumbers,
} from "./helper/generateRandomNumbers";
import { shuffle } from "./helper/shuffleArray";
import Score from "./components/Score";
import StartingScreen from "./components/StartingScreen";
import EndScreen from "./components/EndScreen";

let clickedCards = [];
export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [eventObject, setEventObject] = useState({
    playAgain: false,
    keepPlaying: false,
    difficulty: false,
    clickEnabled: false,
  });

  useEffect(() => {
    const fetchAPI = () => {
      randomNumbersArr.forEach(async (number) => {
        const fetchRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${number}/`
        );
        if (fetchRequest.ok) {
          const data = await fetchRequest.json();
          setCards((oldArray) => [...oldArray, data]);
        } else console.error("There was an error with fetching");
      });
    };

    return () => {
      fetchAPI();
    };
  }, [eventObject.difficulty, eventObject.playAgain, eventObject.keepPlaying]);

  useEffect(() => {
    return (score === cards.length && cards.length !== 0) ||
      (clickedCards.length !== 0 && score === 0)
      ? setEventObject({ ...eventObject, clickEnabled: false })
      : setEventObject({ ...eventObject, clickEnabled: true });
  }, [score, cards.length]);

  function setClickedCards(array) {
    clickedCards = array;
    return array;
  }

  function restartGame() {
    const newCards = [];
    setScore(0);
    setClickedCards([]);
    setRandomNumbers(new Set([]));
    setCards(newCards);
  }

  function handleScore(e) {
    console.log(e.target);
    if (clickedCards.includes(e.target.id)) {
      setScore(0);
      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      setScore((score) => score + 1);
      clickedCards.push(e.target.id);
      shuffle(cards);
    }
  }

  function handleDifficulty(e) {
    const newEventObject = { ...eventObject, difficulty: true };

    switch (e.target.textContent) {
      case "Easy":
        console.log("clicked");
        generateRandomNumbers(5);
        setEventObject(newEventObject);
        break;
      case "Medium":
        generateRandomNumbers(10);
        setEventObject(newEventObject);
        break;
      case "Hard":
        generateRandomNumbers(15);
        setEventObject(newEventObject);
        break;
    }
  }
  function handlePlayAgain() {
    const newEventObject = { ...eventObject, difficulty: false };
    const newCardsArray = [];
    setEventObject(newEventObject);
    setScore(0);
    setClickedCards([]);
    setRandomNumbers(new Set([]));
    setCards(newCardsArray);
  }

  function handleKeepPlaying() {
    if (!eventObject.keepPlaying) {
      const newEventObject = { ...eventObject, keepPlaying: true };
      setEventObject(newEventObject);
    } else {
      const newEventObject = { ...eventObject, keepPlaying: false };
      setEventObject(newEventObject);
    }

    restartGame();
    generateRandomNumbers(cards.length);
  }

  return (
    <>
      {!eventObject.difficulty ? (
        <StartingScreen handleClick={handleDifficulty}></StartingScreen>
      ) : (
        <Score
          score={score}
          length={cards.length}
          highScore={highScore}
        ></Score>
      )}
      {!eventObject.playAgain ? (
        <section className="cards-section">
          {
            <Cards
              data={cards}
              onClick={eventObject.clickEnabled ? handleScore : null}
            />
          }
        </section>
      ) : null}

      {!eventObject.clickEnabled &&
      score === cards.length &&
      !eventObject.playAgain ? (
        <EndScreen
          text="You Win!"
          handleKeepPlaying={handleKeepPlaying}
          handlePlayAgain={handlePlayAgain}
        ></EndScreen>
      ) : null}
      {!eventObject.clickEnabled &&
      score === 0 &&
      clickedCards.length !== 0 &&
      !eventObject.playAgain ? (
        <EndScreen
          text="You Lose!"
          handlePlayAgain={handlePlayAgain}
          handleKeepPlaying={handleKeepPlaying}
        ></EndScreen>
      ) : null}
    </>
  );
}
