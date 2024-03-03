export default function EndScreen({
  text,
  handleKeepPlaying,
  handlePlayAgain,
}) {
  return (
    <>
      <section className="dialogue-section">
        <div className="section-container">
          <dialog open className="modal">
            <h3>{text}</h3>
            <button type="button" onClick={handlePlayAgain}>
              Main Menu
            </button>
          </dialog>
        </div>
      </section>
    </>
  );
}
