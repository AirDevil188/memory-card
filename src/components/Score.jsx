export default function Score({ score, length }) {
  return (
    <section className="gamescore-section">
      <div className="score-container">
        <p>Your Score: {score}</p>
        <p>
          {score} / {length}
        </p>
      </div>
    </section>
  );
}
