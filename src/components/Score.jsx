export default function Score({ score, highScore, length }) {
  return (
    <section className="gamescore-section">
      <div className="score-container">
        <p>Your Score: {score}</p>
        <p>Your High Score: {highScore}</p>
        <p>
          {score} / {length}
        </p>
      </div>
    </section>
  );
}
