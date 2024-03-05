export default function EndScreen({
  state,
  text,
  handleKeepPlaying,
  handlePlayAgain,
}) {
  return (
    <>
      <section className="dialogue-section">
        <dialog id="modal" open>
          <div className="modal-content">
            <h3>{text}</h3>
            {state ? (
              <img src="./src/assets/img/trophy.webp"></img>
            ) : (
              <img src="./src/assets/img/gameover.webp"></img>
            )}
            {state ? (
              <button type="button" onClick={handleKeepPlaying}>
                Play Again
              </button>
            ) : null}
            <button type="button" onClick={handlePlayAgain}>
              Main Menu
            </button>
          </div>
        </dialog>
      </section>
    </>
  );
}
