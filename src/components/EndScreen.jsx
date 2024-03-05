export default function EndScreen({
  state,
  text,
  handleKeepPlaying,
  handlePlayAgain,
}) {
  return (
    <>
      <section className="dialogue-section">
        <div className="section-container">
          <dialog id="modal" open>
            <h3>{text}</h3>
            {state ? (
              <button type="button" onClick={handleKeepPlaying}>
                Play Again
              </button>
            ) : null}
            <button type="button" onClick={handlePlayAgain}>
              Main Menu
            </button>
          </dialog>
        </div>
      </section>
    </>
  );
}
