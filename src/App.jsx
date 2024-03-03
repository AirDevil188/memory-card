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
  const [status, setStatus] = useState("start");

  const start = status === "start";
  const playingGame = status === "playing";
  const win = status === "win";
  const gameOver = status === "gameOver";

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
  useEffect(() => {
    fetchAPI();
  }, [start]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", highScore + 1);
    }
  }, [score, highScore]);

  function setClickedCards(array) {
    clickedCards = array;
    return array;
  }

  function reconstruct() {
    if (localStorage) {
      setHighScore(Number(localStorage.getItem("highScore")));
    } else return;
  }

  function restartGame() {
    const newCards = [];
    setScore(0);
    setClickedCards([]);
    setRandomNumbers(new Set([]));
    setCards(newCards);
  }

  function handleScore(e) {
    if (clickedCards.includes(e.target.id)) {
      setScore(0);
      setStatus("gameOver");
    } else {
      setScore((score) => score + 1);
      console.log(highScore);
      clickedCards.push(e.target.id);
      shuffle(cards);
    }
    if (cards.length === clickedCards.length) {
      setStatus("win");
    }
  }

  function handleDifficulty(e) {
    switch (e.target.textContent) {
      case "Easy":
        generateRandomNumbers(5);
        reconstruct();
        setStatus("playing");
        break;
      case "Medium":
        generateRandomNumbers(10);
        reconstruct();
        setStatus("playing");
        break;
      case "Hard":
        generateRandomNumbers(15);
        reconstruct();
        setStatus("playing");
        break;
    }
  }
  function handlePlayAgain() {
    const newCardsArray = [];
    setScore(0);
    setClickedCards([]);
    setRandomNumbers(new Set([]));
    setCards(newCardsArray);
    setStatus("start");
  }

  function handleKeepPlaying() {
    restartGame();
    generateRandomNumbers(cards.length);
    setStatus("playing");
  }

  return (
    <>
      {start && !playingGame ? (
        <StartingScreen handleClick={handleDifficulty}></StartingScreen>
      ) : (
        <Score
          score={score}
          length={cards.length}
          highScore={highScore}
        ></Score>
      )}
      {playingGame || gameOver || win ? (
        <section className="cards-section">
          {<Cards data={cards} onClick={playingGame ? handleScore : null} />}
        </section>
      ) : null}

      {win ? (
        <EndScreen
          text="You Win!"
          handleKeepPlaying={handleKeepPlaying}
          handlePlayAgain={handlePlayAgain}
        ></EndScreen>
      ) : null}
      {gameOver ? (
        <EndScreen
          text="You Lose!"
          handlePlayAgain={handlePlayAgain}
          handleKeepPlaying={handleKeepPlaying}
        ></EndScreen>
      ) : null}
    </>
  );
}
